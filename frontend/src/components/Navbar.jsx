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
      className='flex items-center justify-between text-sm py-4 mb-5 border-b border-emerald-100 sticky top-0 bg-white z-50 px-6 shadow-sm'
    >
      <div className='flex items-center gap-4'>
          <img
            onClick={() => navigate('/')}
            className='w-16 sm:w-20 cursor-pointer hover:scale-105 transition-transform'
            src={assets.mlogo}
            alt="Logo"
          />
          <h1 className='text-xl font-bold text-gray-800 hidden sm:block'>Medico</h1>
      </div>

      <ul className='md:flex items-start gap-8 font-medium hidden'>
        {['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'].map((item) => (
          <li key={item} className='py-1 relative group'>
            <NavLink to={item === 'HOME' ? '/' : item === 'ALL DOCTORS' ? '/doctors' : `/${item.toLowerCase().replace(' ', '-')}`}>
              <p className='cursor-pointer text-gray-600 group-hover:text-primary font-semibold transition-colors uppercase tracking-tight'>{item}</p>
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className='flex items-center gap-4 '>
        {
          userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-9 h-9 rounded-full border-2 border-emerald-100 group-hover:border-primary transition-all object-cover' src={userData?.image && userData.image !== 'null' ? userData.image : assets.profile_pic} alt="" />
              <img className='w-2.5 group-hover:rotate-180 transition-transform duration-300' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className='min-w-56 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden p-2'
                >
                  <p onClick={() => { role === 'doctor' ? navigate('/doctor-profile') : navigate('/my-profile'); window.scrollTo(0, 0) }} className='px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-primary cursor-pointer transition-all flex items-center gap-3'>
                    <span className='w-2 h-2 rounded-full bg-primary'></span>
                    My Profile
                  </p>
                  <p onClick={() => { navigate('/my-appointments'); window.scrollTo(0, 0) }} className='px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-primary cursor-pointer transition-all flex items-center gap-3'>
                    <span className='w-2 h-2 rounded-full bg-primary'></span>
                    Appointments
                  </p>
                  <div className='h-px bg-gray-50 my-1'></div>
                  <p onClick={() => { logout(); navigate('/') }} className='px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all flex items-center gap-3 font-semibold'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path></svg>
                    Logout
                  </p>
                </motion.div>
              </div>
            </div>
            : <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className='bg-primary text-white px-8 py-3 rounded-2xl font-bold hidden md:flex items-center gap-2 shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all'
            >
              Get Started
            </motion.button>
        }
        <div onClick={() => setShowMenu(true)} className='md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-50 text-primary cursor-pointer active:scale-90 transition-all'>
            <img className='w-6' src={assets.menu_icon} alt="Menu" />
        </div>

        {/* ---- Mobile Menu ---- */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className='fixed inset-0 z-[1000] md:hidden flex flex-col primary-gradient'
            >
              <div className='px-6 py-6 flex items-center justify-between border-b border-white/10'>
                 <div className='flex items-center gap-3'>
                    <img src={assets.mlogo} className='w-12 brightness-0 invert' alt="Logo" />
                    <span className='text-white font-black text-2xl'>MEDICO</span>
                 </div>
                 <button onClick={() => setShowMenu(false)} className='w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md'>
                    <img src={assets.cross_icon} className='w-6 brightness-0 invert' alt="Close" />
                 </button>
              </div>

              <div className='flex-1 py-12 px-6 overflow-y-auto'>
                <div className='flex flex-col gap-4'>
                    {['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'].map((item, index) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={item === 'HOME' ? '/' : item === 'ALL DOCTORS' ? '/doctors' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className={({ isActive }) => `
                                flex items-center justify-center py-6 rounded-3xl text-3xl font-black transition-all
                                ${isActive ? 'bg-white text-primary shadow-2xl scale-105' : 'text-white/80 hover:bg-white/10'}
                            `}
                        >
                            {item}
                        </NavLink>
                    </motion.div>
                    ))}
                </div>
              </div>

              <div className='p-8 bg-black/5'>
                 <button 
                  onClick={() => {navigate(userData ? '/my-profile' : '/login'); setShowMenu(false)}}
                  className='w-full py-5 bg-white text-primary rounded-[2rem] font-black text-xl shadow-2xl active:scale-95 transition-all'
                 >
                   {userData ? 'GO TO DASHBOARD' : 'LOGIN / REGISTER'}
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Navbar
