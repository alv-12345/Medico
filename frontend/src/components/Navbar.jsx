import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-gray-200 shadow-sm bg-white">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
        onClick={() => navigate('/')}
      >
        <img className="w-9 h-9" src={assets.logo1} alt="logo" />
        <p className="text-2xl font-bold text-primary tracking-wide">Medico</p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-10 font-medium text-gray-700">
        {[
          { path: '/', label: 'Home' },
          { path: '/doctors', label: 'Find Doctors' },
          { path: '/about', label: 'About' },
          { path: '/contact', label: 'Contact' },
        ].map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `relative py-1 transition-colors hover:text-primary ${
                isActive ? 'text-primary font-semibold' : ''
              }`
            }
          >
            {item.label}
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
          </NavLink>
        ))}
      </ul>

      {/* Create Account Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-primary text-white px-6 py-2 rounded-full font-medium hidden md:block hover:bg-primary-dark shadow-md transition-all"
        >
          Create Account
        </button>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-7 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          showMenu ? 'fixed w-full h-full' : 'h-0 w-0'
        } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
          <img className="w-36" src={assets.logo} alt="logo" />
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <ul className="flex flex-col items-center gap-4 mt-6 px-5 text-lg font-medium text-gray-700">
          {[
            { path: '/', label: 'Home' },
            { path: '/doctors', label: 'All Doctors' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
          ].map((item, idx) => (
            <NavLink
              key={idx}
              onClick={() => setShowMenu(false)}
              to={item.path}
              className="px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all w-full text-center"
            >
              {item.label}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;