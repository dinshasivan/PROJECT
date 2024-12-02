import React from 'react'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <section className='max-padd-container max-xl:mt-8 xl:mb-16'>
      <div className='max-padd-container bg-hero bg-cover bg-center
        bg-no-repeat h-[736px] w-full rounded-tl-3xl rounded-tr-3xl mt-6'>
        <div className='relative max-w-[777px] top-48'>
          <h5 className='flex items-baseline gap-x-2 uppercase
          text-secondary medium-18'>Send Flowers like You mean it</h5>
          <p className='pl-2 max-w-lg mt-6 mb-8 border-1-4 border-1-secondary'>Where flowers are our inspiration to create lasting memories.
            Whatever the occasion, our flowers will make it special cursus a site amet mauris.
          </p>
          <div className='flex gap-2 sm:gap-6 mt-14'>
            <Link to className='btn-dark max-sm:lp-3'>
            latest product</Link>
            <Link to className='btn-secondary max-sm:lp-3'>
            Popular product</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero