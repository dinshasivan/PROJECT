import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({product}) => {
  return (
    <div className='right-1 ring-slate-900/5 rounded-xl bg-white overflow-hidden'>
        <Link to={`/product/${product._id}`}className='flexCenter relative'>
            <img src={product.image[0]} alt="productimage" />
        </Link>
        <div>
            <h4>{product.name}</h4>
            <div>
                <p> {product.category} </p>
                <h5>Rs{product.price}</h5>
            </div>
            <p>{product.description}</p>
        </div>
    </div>
  )
}

export default Item