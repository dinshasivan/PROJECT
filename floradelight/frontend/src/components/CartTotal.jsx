import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const {currency,getCartAmount,delivery_charge}=useContext(ShopContext)

  return (
    <div className='w-full p-6'>
        <h3 className='font-bold mb-5 pt-8'>Cart <span className='text-secondary'>Total</span></h3>
        <div className='flexBetween pt-6 '>
            <h4 className='font-bold'>SubTotal:</h4>
            <p className='font-semibold'>
                {currency}
                {getCartAmount()}
            </p>
        </div>
        <hr className='ma-auto h-[1px] w-full'/>
        <div className='flexBetween pt-8'>
            <h4 className='font-bold'>Shipping Charge:</h4>
            <p className='font-semibold'>{getCartAmount() === 0 ? "0.00" : `${currency} ${delivery_charge}.00`} </p>
        </div>
        <hr />
        <div  className='flexBetween pt-8'>
            <h4 className='font-bold'>Total:</h4>
            <p className='font-semibold'>{currency}{getCartAmount() === 0 ? 0.00 : getCartAmount() +delivery_charge}.00 </p>
        </div>
    </div>
  )
}

export default CartTotal