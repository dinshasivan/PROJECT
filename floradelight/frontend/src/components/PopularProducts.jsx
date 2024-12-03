import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { products } from '../assets/data'
import { ShopContext } from '../context/ShopContext'
import Item from './Item'

const PopularProducts = () => {

  const {products} = useContext(ShopContext)
  const [popularProducts,setPopularProducts]=useState([])



  useEffect(()=>{
    const data = products.filter(item =>item.popular)
    setPopularProducts(data.slice(0,5))
  },[products])
  return (
    <section className='max-padd-container py-16'>
      <Title title={'Popular Products'} titleStyles ={'text-center'} />
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {popularProducts.map(product=>(
          <div key={product._id}>
            <Item product={product}/>
          
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularProducts