
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContextCore'
import api from '../services/api' // Assuming api service exists
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const DoctorsList = () => {

    const { aToken } = useContext(AuthContext) // Assuming admin token is available in context

    const [doctors, setDoctors] = useState([])

    const getAllDoctors = async () => {
        try {
            const { data } = await api.get('/admin/all-doctors')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message, { autoClose: 800 })
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 800 })
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await api.post('/admin/change-availability', { docId })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message, { autoClose: 800 })
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 800 })
        }
    }

    useEffect(() => {
        getAllDoctors()
    }, [])

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {doctors.map((item, index) => (
                    <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                        <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image && item.image !== 'null' ? item.image : assets.profile_pic} alt="" />
                        <div className='p-4'>
                            <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                            <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                            <div className='mt-2 flex items-center gap-1 text-sm'>
                                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                                <p>Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsList
