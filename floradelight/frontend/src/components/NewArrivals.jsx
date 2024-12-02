import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import Item from './Item'
import { ShopContext } from '../context/ShopContext.jsx'

const NewArrivals = () => {
    const {products} =useContext(ShopContext)
    const [newArrivals, setNewArrivals]=useState([])

    console.log(products);
    

    useEffect(()=>{
        const data = products.slice(0.10)
        setNewArrivals(data)
    },[products])
  return (
   <section >
        <Title title={'New Arrivals'} titleStyle={'text-center'} />

        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
            {newArrivals.map((product)=>{
                <div key={product._id}>
                    <Item product={product}/>
                </div>
            })}
        </div>
   </section>
  )
}

export default NewArrivals