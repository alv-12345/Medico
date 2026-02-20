import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextCore'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {

  const navigate = useNavigate()
  const { user: userData, role, logout } = useContext(AuthContext)

  const [showMenu, setShowMenu] = useState(false)

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='flex items-center justify-between text-sm py-4 mb-5 border-b border-white/20 sticky top-0 bg-white/70 backdrop-blur-lg z-50'
    >
      <img
        onClick={() => navigate('/')}
        className='w-20 cursor-pointer hover:scale-105 transition-transform'
        src={assets.mlogo}
        alt=""
      />
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        {['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'].map((item) => (
          <li key={item} className='py-1 relative group text-xs sm:text-sm'>
            <NavLink to={item === 'HOME' ? '/' : item === 'ALL DOCTORS' ? '/doctors' : `/${item.toLowerCase().replace(' ', '-')}`}>
              {item}
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className='flex items-center gap-4 '>
        {
          userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full border-2 border-transparent group-hover:border-primary transition-all' src={userData?.image && userData.image !== 'null' ? userData.image : assets.profile_pic} alt="" />
              <img className='w-2.5 group-hover:rotate-180 transition-transform duration-300' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className='min-w-48 bg-stone-100 rounded shadow-xl flex flex-col gap-4 p-4'
                >
                  <p onClick={() => {
                    if (role === 'doctor') {
                      navigate('/doctor-profile');
                    } else {
                      navigate('/my-profile');
                    }
                    window.scrollTo(0, 0)
                  }} className='hover:text-black cursor-pointer transition-colors'>My Profile</p>
                  <p onClick={() => { navigate('/my-appointments'); window.scrollTo(0, 0) }} className='hover:text-black cursor-pointer transition-colors'>My Appointments</p>
                  <p onClick={() => { logout(); navigate('/') }} className='hover:text-black cursor-pointer transition-colors'>Logout</p>
                </motion.div>
              </div>
            </div>
            : <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className='bg-primary text-white px-7 py-2.5 rounded-full font-medium hidden md:flex items-center gap-2 shadow-md hover:shadow-xl hover:bg-emerald-600 transition-all duration-300 border border-emerald-400/20'
            >
              <span>Login / Register</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </motion.button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className='fixed inset-0 z-50 bg-white md:hidden'
            >
              <div className='flex items-center justify-between px-5 py-6 border-b'>
                <img src={assets.logo1} className='w-20' alt="" />
                <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer hover:rotate-90 transition-transform' alt="" />
              </div>
              <ul className='flex flex-col items-center gap-6 mt-10 px-5 text-xl font-medium'>
                {['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'].map((item) => (
                  <NavLink
                    key={item}
                    onClick={() => setShowMenu(false)}
                    to={item === 'HOME' ? '/' : item === 'ALL DOCTORS' ? '/doctors' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className='w-full text-center py-4 rounded-xl hover:bg-emerald-50 transition-colors uppercase tracking-widest'
                  >
                    {item}
                  </NavLink>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Navbar
