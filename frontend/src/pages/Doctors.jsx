import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../assets/assets'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (Array.isArray(doctors) && speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else if (Array.isArray(doctors)) {
      setFilterDoc(doctors)
    } else {
      setFilterDoc([])
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  if (!doctors) {
    return (
      <div className='flex items-center justify-center py-20'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-primary'></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='py-5'
    >
      <h1 className='text-3xl font-bold text-gradient mb-2'>Browse through the specialist doctors.</h1>
      <p className='text-gray-500 mb-8'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-2 px-6 border border-emerald-200 rounded-full text-sm font-medium transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : 'bg-emerald-50 text-emerald-700'}`}
        >
          {showFilter ? 'Close Filters' : 'Show Filters'}
        </button>

        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} min-w-48`}>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((item) => (
            <motion.p
              key={item}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
              className={`w-[94vw] sm:w-auto pl-4 py-2.5 pr-12 border rounded-xl transition-all cursor-pointer font-medium ${speciality === item ? 'bg-emerald-50 border-primary text-primary shadow-sm' : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/30'}`}
            >
              {item}
            </motion.p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          <AnimatePresence mode='popLayout'>
            {filterDoc.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)" }}
                onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                className='border border-emerald-100/50 rounded-2xl overflow-hidden cursor-pointer bg-white transition-all group'
                key={item._id}
              >
                <div className='overflow-hidden bg-emerald-50/30'>
                  <img className='group-hover:scale-110 transition-transform duration-500' src={item.image && item.image !== 'null' ? item.image : assets.profile_pic} alt="" />
                </div>
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-emerald-500 font-medium'>
                    <p className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></p>
                    <p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-bold mt-1'>{item.name}</p>
                  <p className='text-gray-500 text-sm font-medium'>{item.speciality}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filterDoc.length === 0 && (
            <div className='col-span-full py-20 text-center flex flex-col items-center gap-4'>
              <img className='w-20 opacity-20' src={assets.mlogo} alt="" />
              <p className='text-gray-400 font-medium'>No doctors found for this speciality.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Doctors
