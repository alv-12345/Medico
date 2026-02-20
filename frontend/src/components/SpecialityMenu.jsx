import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
            <h1 className='text-3xl font-medium text-gradient'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-500'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto pb-4'>
                {specialityData.map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className='shrink-0'
                    >
                        <Link
                            to={`/doctors/${item.speciality}`}
                            onClick={() => window.scrollTo(0, 0)}
                            className='flex flex-col items-center text-xs cursor-pointer'
                        >
                            <div className='w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-emerald-50/50 hover:bg-emerald-100/80 transition-all duration-300 mb-3 shadow-none border border-emerald-100/20'>
                                <img className='w-12 sm:w-16' src={item.image} alt="" />
                            </div>
                            <p className='font-medium text-gray-700'>{item.speciality}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
