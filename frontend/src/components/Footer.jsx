import React from 'react'
import { assets } from '../assets/assets'
import Reveal from './Reveal'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className="mt-20 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
      <Reveal width="100%">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr] gap-12 lg:gap-24">

            {/* Brand Section */}
            <div className="flex flex-col gap-5">
              <motion.img
                onClick={() => { navigate('/'); window.scrollTo(0, 0) }}
                whileHover={{ scale: 1.02 }}
                className="w-36 cursor-pointer"
                src={assets.mlogo}
                alt="Medico Logo"
              />
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Excellence in healthcare, connected. We bridge the gap between patients and top-tier medical specialists, providing trusted care for a healthier world.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                  { icon: "twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                  { icon: "linkedin", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 1-2-2 2 2 0 0 1 2 2z" }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -2, scale: 1.05 }}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-primary hover:border-primary transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.path}></path>
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 font-semibold mb-6 text-base relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-4 after:h-0.5 after:bg-primary">Company</h4>
              <ul className="flex flex-col gap-4 text-gray-500 text-sm">
                <li onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>
                  Home
                </li>
                <li onClick={() => { navigate('/about'); window.scrollTo(0, 0) }} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>
                  About us
                </li>
                <li onClick={() => { navigate('/contact'); window.scrollTo(0, 0) }} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>
                  Contact us
                </li>
                <li onClick={() => { navigate('/reviews'); window.scrollTo(0, 0) }} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors"></span>
                  Reviews
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2024 Medico. Healthcare with Heart.</p>
            <div className="flex gap-8">
              <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Cookies Settings</span>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}

export default Footer
