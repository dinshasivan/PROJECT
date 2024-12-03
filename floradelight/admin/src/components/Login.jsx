import React, { useState } from 'react'
import loginImage from '../assets/bn.jpg'
import axios from 'axios'
import { backend_url } from '../App.jsx'
import {toast} from 'react-toastify'

const Login = ({setToken}) => {
  const [email,setEmial]= useState('')
  const [password, setPassword]= useState('')

  const onsubmitHandler = async(e)=>{
    try{
      e.preventDefault()
      // console.log(email,password);
      const response = await axios.post( 'http://localhost:4000/api/user/admin',
      {email,password})
      if(response.data.success){
        setToken(response.data.token)
      }else{
         toast.error(response.data.message)
      }

      console.log(response);
      
      
    }catch(error){
      console.log(error);
      toast.error(error.message)
      
    }
  }
  
  return (
    <section className='absolute top-0 left-0 h-full w-full z-50 bg-white'>
      <div className='flex w-full h-full'>
        {/* form side */}
        <div className='flex w-full sm:w-1/2 items-center justify-center'>
          <form onSubmit={onsubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800'>
            <div className='w-full mb-4'>
              <h3 className='font-bold text-2xl'>Login </h3>
            </div>
            
            <div className='w-full'>
              <label htmlFor="email"  className='medium-15'>Email</label>
              <input 
                type="text" 
                placeholder='Email'
                required 
                value={email}
                onChange={(e)=>setEmial(e.target.value)}
                className='w-full px-3 py-1.5
                ring-slate-900/10 rounded bg-primary mt-1'/>
            </div>
            <div className='w-full'>
              <label htmlFor="password"  className='medium-15'>Password</label>
              <input 
                type="password" 
                placeholder='Password'
                required 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full px-3 py-1.5
                ring-slate-900/10 rounded bg-primary mt-1'/>
            </div>
            <button type='submit' className='p-2 bg-purple-300 rounded-lg w-full mt-5 !py-[9px]'>Login </button>
            
          </form>
        </div>
        {/* image side */}
        <div className='w-1/2 hidden sm:block'>
          <img src={loginImage} alt="" className='object-cover h-full'/>
        </div>
      </div>
    </section>
  )
}

export default Login