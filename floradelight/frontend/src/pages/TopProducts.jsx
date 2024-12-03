import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/Item'
import ShowSearch from '../components/ShowSearch'

const TopProducts = () => {
  const {products} = useContext(ShopContext)
  const [category, setCategory] = useState([])
  const [subCategory,setsubCategory]=useState([])

  const [filteredProduct, setFilteredProduct]=useState([])

  const toggleFilter=(value, setState)=>{
    setState((prev)=> 
      prev.includes(value) ? prev.filter((item)=>item !==value):[...prev,value]
    )
  }

  const applyFilters =()=>{
    let filtered = [...products];

    if(category.length){
      filtered = filtered.filter((product)=>
        category.includes(product.category))
    }
    if(subCategory.length){
      filtered = filtered.filter((product)=>
        subCategory.includes(product.subCategory))
    }

    return filtered
  }

  

  useEffect(()=>{
   

    setFilteredProduct(products)
  })

  return (
    <section className='max-padd-container'>
      <div className='flex flex-col sm:flex-row gap-8 mt:8 xl:mt-6'>
        {/* filter option */}
        <div className='min-w-60 bg-white p-4 rounded-2xl'>
          {/* search Box */}

          
          {/* category filter */}
          <div className='bg-primary border ring-slate-900/5 pl-5 py-3'>
            <h5 className='h5 mb-4'>Categories</h5>
            <div className='flex flex-col gap-2 text-sm font-light'>
              {["Flowers", "Gifts", "Plants"].map((cat)=>(
                <label key={cat} className='flex gap-2 medium-14 text-gray-30'>
                  <input type="checkbox" value={cat} className='w-3' />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          {/* filter type */}
          <div className='bg-primary border ring-slate-900/5 pl-5 py-3 mt-4'>
            <h5 className='h5 mb-4'>Type</h5>
            <div className='flex flex-col gap-2 text-sm font-light'>
              {["Rose", "personalised" , "flowers"].map((subcat)=>(
                  <label key={subcat} className='flex gap-2 medium-14 text-gray-30'>
                    <input type="checkbox" value={subcat} className='w-3' />
                    {subcat}
                  </label>
                ))}
            </div>
          </div>
          {/* right side */}
          
        </div>
        <div>
            <div>
              <Title title={'Our Top Products'}/>
              {/* product categories */}
              <div>
                {filteredProduct.length > 0 ?(
                  filteredProduct.map((product)=>(
                    <Item product={product} key={product._id}/>
                  ))
                ): (
                  <p className='capitalize'>No Products found selected category</p>
                )}
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default TopProducts