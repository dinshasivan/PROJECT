import axios from 'axios'
import React,{ useState } from 'react'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import { currency } from '../App'
import { MdDelete } from "react-icons/md"



const List = ({token,currency}) => {

  const [list, setList] = useState([])

  const fetchList = async ()=>{
    try{
      const response = await axios.get('http://localhost:4000/api/product/get-product')

      if(response.data.success){
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }

      console.log(response.data);
      

    }catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id)=>{
    try{
      const response = await axios.post('http://localhost:4000/api/product/remove-product',
        remove,{id},{headers:{token}}
      )
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data.message)
      }

    }catch(error){
      console.log(error);
      toast.error(response.data.message)
      
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='pl-8'>
      <h3 className=''>All Product List</h3>
      <div className='flex flex-col gap-2 pt-4'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]
        items-center py-1 px-2 border text-secondary bg-white font-bold sm:bold-16
        rounded'>
          <h5>image</h5>
          <h5>name</h5>
          <h5>category</h5>
          <h5>price</h5>
          <h5>remove</h5>
        </div>
      </div>
      {/*  product list*/}
      {list.map((item)=>{
        <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-flow-col-[1fr_3fr_1fr_1fr_1fr] 
        items-center gap-2 p-1 bg-white rounded-lg'>
          <img src={item.image[0]} alt="" className='w-12 rounded-lg'/>
          <h5 className='text-sm font-semibold'>{item.name}</h5>
          <h5 className='text-sm font-semibold'>{item.description}</h5>
          <div className='text-sm font-semibold'>{currency}{item.price}</div>
          <div><MdDelete onClick={()=>removeProduct(item._id)}/></div>
        </div>
      })}
    </div>
  )
}

export default List