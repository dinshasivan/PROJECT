import React from 'react'
import aboutTag from '../assets/bc.jpg'
import Footer from '../components/Footer'

const About = () => {
  const statistics = [
    {label:"Satisfied Customers",value:99},
    {label:"Exclusive Products",value:12},
    {label:"New Products",value:5}
  ]
  return (
    <section>
      <div className='max-padd-conatiner '>
        <div className='max-padd-container py-10 bg-white rounded-2xl my-6'>
          {/* container */}
          <div className='flex flex-col xl:flex-row gap-10'>
            {/* leftside */}
            <div className='flex-1 relative'>
              <div className='bg-gray-20 rounded-3xl rounded-tr-[155px] w-[488px]'>
                <img src={aboutTag} alt="abouut" />
              </div>
            </div>
           {/* right side */}
           <div>
            <h2 className='h2 max-w-[472px]'>We Are Flower Lovers And The Home of Flowers</h2>
            <p className='py-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              {/* satatic container */}
              <div className='flex flex-wrap gap-4'>
                {statistics.map((statistics,index)=>{
                  <div key={index} className='bg-primary text-secondary p-4 rounded-lg'>
                    <div className='flex items-center gap-1'>
                      <h3 className='h3'>{statistics.value}k</h3>
                      <h4 className='font-bold'>+</h4>
                    </div>
                    <p >{statistics.label}</p>
                  </div>
                })}
                
              </div>
           </div>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  )
}

export default About