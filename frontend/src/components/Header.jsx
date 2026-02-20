import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Header = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex flex-col md:flex-row flex-wrap primary-gradient rounded-2xl px-6 md:px-12 lg:px-20 overflow-hidden shadow-xl relative'
        >

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-8 md:py-10 m-auto z-10'>
                <motion.p
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className='text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight'
                >
                    Book Appointment <br />  With Trusted Doctors
                </motion.p>
                <div className='flex flex-col gap-3'>
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'
                    >
                        <img className='w-20 drop-shadow-md' src={assets.group_profiles} alt="" />
                        <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                    </motion.div>
                </div>
                <motion.a
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href='#speciality'
                    className='flex items-center gap-2 bg-white px-6 py-2.5 rounded-full text-primary font-semibold text-sm m-auto md:m-0 shadow-lg hover:shadow-white/20 transition-all duration-300'
                >
                    Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                </motion.a>
            </div>

            {/* --------- Header Right --------- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className='md:w-1/2 relative flex items-end justify-end'
            >
                <img className='w-full md:absolute bottom-0 h-auto max-h-[360px] object-contain drop-shadow-2xl' src={assets.header_img} alt="" />
            </motion.div>
        </motion.div>
    )
}

export default Header
