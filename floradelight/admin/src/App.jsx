import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'

export const backend_url = import.meta.env.BACKEND_URL
export const currency = "$"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?
localStorage.getItem("token"):"")

  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])
  // console.log(token);
  
  return (
    <main>
      <ToastContainer/>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (

        <div className='bg-primary text-[#404040]'>
          <Header />
          <div className='mx-auto max-w-[1440px] flex flex-col sm:flex-row
            mt-0 sm:mt-4'>
            <Sidebar token={token} setToken={setToken}/>
            <Routes>
              <Route path='/' element={<Add  token={token} />} />
              <Route path='list' element={<List token={token} />} />
              <Route path='orders' element={<Orders token={token} />} />
            </Routes>
          </div>

        </div>
      )}
    </main>
  )
}

export default App