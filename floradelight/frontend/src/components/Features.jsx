import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdCollectionsBookmark } from "react-icons/md";

const Features = () => {
  return (
   <section className='max-padd-container py-16'>
    {/* title */}
    <div className='h2 capitalize pb-1 relative after:w-96 after:h-1  after:absolute after:bottom-1 
        after:right-0 after:rounded'>
        <h1 className='text-center text-green-600 font-bold text-3xl' >Our Features</h1>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 bg-white rounded-lg'>
        <div className='p-4 rounded-3xl ml-40'>
            <MdCollectionsBookmark className='font-bold text-green-800  w-20 h-10'/>
            <h4 className=' font-bold'>Verity of Collection</h4>
            <p>hxjhabjxkhsjkcbsk</p>

        </div>
        <div className='p-4 rounded-3xl ml-40'>
            <RiSecurePaymentLine className='font-bold text-green-800  w-20 h-10'/>
            <h4 className='font-bold'>Secure Payment</h4>
            <p>hxjhabjxkhsjkcbsk</p>

        </div>
        <div className='p-4 rounded-3xl ml-40'>
            <TbTruckDelivery className='font-bold text-green-800 w-20 h-10'/>
            <h4 className='font-bold'>Fast Delivery</h4>
            <p>hxjhabjxkhsjkcbsk</p>

        </div>

    </div>
   </section>
  )
}

export default Features