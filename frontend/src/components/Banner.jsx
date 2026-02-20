import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='flex primary-gradient rounded-xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-2xl relative overflow-hidden'
        >

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 relative z-10'>
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'
                >
                    <p>Book Appointment</p>
                    <p className='mt-4'>With 100+ Trusted Doctors</p>
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
                    className='bg-white text-primary px-8 py-3.5 rounded-full mt-6 font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group'
                >
                    <span>Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </motion.button>
            </div>

            {/* ------- Right Side ------- */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className='hidden md:block md:w-1/2 lg:w-92.5 relative'
            >
                <img className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl' src={assets.appointment_img} alt="" />
            </motion.div>
        </motion.div>
    )
}

export default Banner
