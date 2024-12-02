import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='max-padd-container mt-10'>
        <div className='max-padd-container bg-black text-white py-10 rounded-tr-3xl rounded-tl-3xl'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
                <div>
                    {/* logo */}
                    <Link>
                        <img src={logo} alt="" />
                    </Link>
                    <p className='text-white mt-5'>Floradelight</p>
                    <p className='mt-4 text-white/70'>Copyright 2024 floradelight. All rights reserved</p>

                {/* Quick links */}
                </div>
                <div>
                    <h4 className='h4 mb-4'>Quick Links</h4>
                    <ul className='space-y-2 regular-15'>
                        <li className='text-gray-10'><a href="about">About Us</a></li>
                        <li className='text-gray-10'><a href="products">Products</a></li>
                        <li className='text-gray-10'><a href="about">Service</a></li>
                        <li className='text-gray-10'><a href="about">Contact</a></li>
                        <li className='text-gray-10'><a href="about">Privacy Policy</a></li>
                    </ul>
                </div>
                {/* contact us */}
                <div>
                    <h4>Contact Us</h4>
                    <p>phone</p>
                    <p>adrress</p>
                    <p>email</p>
                </div>
                {/* Follw us */}
                <div>
                    <h4>Follow Us</h4>
                    <div className='flext space-x-4 mt-2'>
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaYoutube /></a>
                    </div>

                </div>
            </div>
            <div className='mt-10 text-center text-gray-100'>
                <p>Powered by <a href="#">Floradelight Team</a></p>
            </div>
                
        </div>
    </footer>
  )
}

export default Footer