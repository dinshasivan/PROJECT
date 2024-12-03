import React from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ token, setToken }) => {
  
  return (
    <div className='bg-white shadow-lg rounded-xl p-5 sm:w-64  sm:min-h-96 mb-3 max-sm:flexCenter max-xs:pb-3'>
      {/* Sidebar Header */}
      <h2 className='text-xl font-bold text-gray-700 mb-5 hidden sm:block'>
        Dashboard
      </h2>

      {/* Sidebar Navigation */}
      <div className='flex max-sm:items-center sm:flex-col justify-between h-full'>
        <div className='flex sm:flex-col gap-4'>
          {/* Add Items */}
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-x-3 p-4 font-semibold bg-gray-400 text-white rounded-lg shadow-md transition duration-200"
                : "flex items-center gap-x-3 p-4 font-semibold text-gray-700 hover:bg-gray-100 hover:shadow-sm rounded-lg transition duration-200"
            }
          >
            <FaSquarePlus size={20} />
            <div className='hidden sm:block'>Add Items</div>
          </NavLink>

          {/* List Items */}
          <NavLink
            to={'/list'}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-x-3 p-4 font-semibold bg-gray-400 text-white rounded-lg shadow-md transition duration-200"
                : "flex items-center gap-x-3 p-4 font-semibold text-gray-700 hover:bg-gray-100 hover:shadow-sm rounded-lg transition duration-200"
            }
          >
            <FaListAlt size={20} />
            <div className='hidden sm:block'>List Items</div>
          </NavLink>

          {/* Orders */}
          <NavLink
            to={'/orders'}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-x-3 p-4 font-semibold bg-gray-400 text-white rounded-lg shadow-md transition duration-200"
                : "flex items-center gap-x-3 p-4 font-semibold text-gray-700 hover:bg-gray-100 hover:shadow-sm rounded-lg transition duration-200"
            }
          >
            <MdFactCheck size={20} />
            <div className='hidden sm:block'>Orders</div>
          </NavLink>
        </div>

        {/* Logout Button */}
        <div className='flex items-center justify-center sm:mt-auto mt-5'>
          {token && (
            <button
              onClick={() => setToken('')}
              className='flex items-center gap-x-2 p-4 font-bold text-red-500 
              cursor-pointer bg-red-100 hover:bg-red-200 transition duration-200 rounded-lg'
            >
              <BiLogOut size={20} />
              <div className='hidden sm:block'>Logout</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
