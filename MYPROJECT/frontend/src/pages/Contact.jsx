import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Contact=()=> {
  return (
    <section className="py-16 bg-white-50" id="Contact">
        <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
            <div className="lg:w-1/2 mb-8 lg:mb-0">
                <p className="text-sm text-green-600 mb-2">How can we help you?</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact us</h2>
                <p className="text-gray-600 mb-6">We're here to help and answer any questions you might have. We look forward to hearing from you!</p>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <i className=" text-xl text-green-600 mr-3"><FaLocationDot /></i>
                        <span>Ankersgade 12C, 1, 8000 Aarhus</span>
                    </li>
                    <li className="flex items-center">
                        
                        <i className=" text-xl text-green-600 mr-3"><MdAddCall/></i>
                        <span>+45 71 99 77 07</span>
                    </li>
                    <li className="flex items-center">
                        <i className=" text-xl text-green-600 mr-3"><MdMailOutline /></i>
                        <span>mail@sleeknote.com</span>
                    </li>
                </ul>

                {/* <div className="flex justify-center space-x-6 mt-20">
                    <a href="#" className="text-2xl text-gray-600 hover:text-green-600 transition">
                        <i className="text-pink-600"><FaInstagram /></i>
                    </a>
                    <a href="#" className="text-2xl text-gray-600 hover:text-green-600 transition">
                        <i className="text-blue-700"><FaFacebook /></i>
                    </a>
                    <a href="#" className="text-2xl text-gray-600 hover:text-green-600 transition">
                        <i className="text-red-600"><IoLogoYoutube /></i>
                    </a>
                </div> */}
            </div>
            
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700">Name</label>
                        <input type="text" id="name" name="name" className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Your Name" required/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Your Email" required/>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-gray-700">Message</label>
                        <textarea id="message" name="message" rows="4" className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-green-500 transition">Send Message</button>
                </form>
            </div>
        </div>
    </div>
</section>
  );
}

export default Contact;
