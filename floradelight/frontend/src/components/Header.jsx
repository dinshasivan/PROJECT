import React, { useState ,useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import { BiMenu } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import logo from '../assets/logo.png'
import { ShopContext } from '../context/ShopContext';
import ShowSearch from './ShowSearch';

const Header = () => {

  const {setShowSearch}=useContext(ShopContext)

  const [menuOpen, setMenuOpen]= useState(false)
  const [token, setToken] = useState(true)
  const navigate =useNavigate()

  const toggleMenu = ()=>{
    setMenuOpen((prev)=>!prev)
  }

  const logout =()=>{
    localStorage.removeItem('token')
    setToken('')
    // setCartItems
    navigate('/login')
  }

  return (
    <header className='py-5 w-full bg-white'>
      <div className='max-padd-container flexBetween'>
        {/* logo */}
        <Link to={'/'} className='bold-24 flex-1 '>
          <img src={logo} width={280}
              height={60} alt="logo.png" className='hidden lg:block'/>
          
          <img src={logo} width={280}
              height={60} alt="logo.png" className='lg:hidden'/>

        </Link>


      {/* Navbar */}
        <div className='flex-1'>
          <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} 
          containerStyles={`${menuOpen ? " flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 py-4 shadow-xl":" hidden xl:flex gap-x-5 xl:gap-x-8 medium-15 rounded-full px-2 py-1"}` } />
        </div>

        {/* logo */}
     
        
        <div className='flexBetween gap-x-2 xs:gap-x-8'>
          {!menuOpen && (
            <BiMenu onClick={toggleMenu }
            className='xl:hidden cursor-pointer text-2xl'/>
          )}
          <div className=''>
           <ShowSearch/>
            {/* <IoIosSearch onClick={()=>setShowSearch((prev)=>!prev)} className='text-xl cursor-pointer'/> */}
          </div>
          <Link to={'/cart'} className='flex relative'>
          <FaShoppingCart className='text-[25px]'/>
          <span className='bg-green-700 text-white medium-14 absolute right-0.5 -top-3 flexCenter w-5 h-5 rounded-full shadow-inner '>0</span>
          </Link>

          <div className='group relative'>
            <div onClick={()=> token && navigate('/login')}>
              <FaRegUserCircle className='text-2xl cursor-pointer'/>
            </div>
            {token && <>
            <ul className='bg-white shadow-sm p-3 w-32 ring-1 ring-slate-900/15 rounded absolute right-0 hidden group-hover:flex flex-col '>
              <li onClick={()=>navigate('/orders')} 
                className='flexBetween cursor-pointer'>
                <p>Oders</p>
                <FaArrowRight className='text-[19px] opacity-50'/>
              </li>
              <hr className='my-2'/>
              <li onClick={logout}
                className='flexBetween cursor-pointer'>
                <p>Logout</p>
                <FaArrowRight className='text-[19px] opacity-50'/>
              </li>
            </ul>
            </>}
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header