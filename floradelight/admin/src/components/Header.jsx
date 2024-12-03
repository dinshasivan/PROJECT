import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className='flexCenter py-8 bg-white'>
        {/* logo */}
        <Link to={'/'} className='bold-24 flex-1 '>
          <img src={logo} width={280}
              height={60} alt="logo.png" className='hidden lg:block'/>
          
          <img src={logo} width={180}
              height={60} alt="logo.png" className='lg:hidden'/>

        </Link>
    </header>
  )
}

export default Header