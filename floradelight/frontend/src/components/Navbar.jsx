import React from 'react'
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({containerStyles,toggleMenu,menuOpen}) => {
  const navItems =[
    {to:'/',label:"Home"},
    {to:'/topproducts',label:"Top Products"},
    {to:'/about',label:"About"},
    {to:'/contact',label:"Contact"},
  ]
  return (
    <nav className={containerStyles}>
      {/*  close button inside navbar*/}
      {menuOpen && (
        <>
        <IoClose onClick={toggleMenu}  
        className='text-2xl self-end cursor-pointer relative left-32 text-secondary'/>
        <Link to={'/'} className='bold-24 mb-10'>
        <h4 className='text-green-500 mt-4 '>Floradelight</h4>
        </Link>
        </>
       
      )}
      {navItems.map(({to,label})=>(
        <div key={label} className='flex font-bold mt-10'>
          <NavLink to={to}
            className={({isActive})=> isActive ?
              "active-link flexCenter gap-x-2" : 
              "flexCenter gap-x-2"}
              onClick={menuOpen && toggleMenu}
          >
            <h4>{label}</h4>

          </NavLink>
        </div>
      ))}
    </nav>
  )
}

export default Navbar