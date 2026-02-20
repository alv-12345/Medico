import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium text-gradient'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-500'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <motion.div
                        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            window.scrollTo(0, 0)
                        }}
                        className='border border-emerald-100/50 rounded-xl overflow-hidden cursor-pointer bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-xl'
                        key={index}
                    >
                        <img className='bg-emerald-50/30 hover:bg-emerald-50/60 transition-colors duration-500' src={item.image && item.image !== 'null' ? item.image : assets.profile_pic} alt="" />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-emerald-500 font-medium'>
                                <p className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-bold'>{item.name}</p>
                            <p className='text-gray-500 text-sm font-medium'>{item.speciality}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                className='bg-emerald-50 text-emerald-700 px-12 py-3 rounded-full mt-10 hover:bg-emerald-100 transition-all shadow-sm border border-emerald-100/50 font-medium'
            >
                more
            </motion.button>
        </div>
    )
}

export default TopDoctors
