
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContextCore'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import api from '../services/api'
import { toast } from 'react-toastify'

const AllAppointments = () => {

    const { aToken } = useContext(AuthContext)
    const { currencySymbol } = useContext(AppContext)
    const [appointments, setAppointments] = useState([])

    const getAllAppointments = async () => {
        try {
            const { data } = await api.get('/admin/appointments')
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 800 })
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await api.post('/admin/cancel-appointment', { appointmentId })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message, { autoClose: 800 })
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 800 })
        }
    }

    useEffect(() => {
        getAllAppointments()
    }, [])

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>
                {appointments.map((item, index) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img className='w-8 rounded-full' src={item.userData.image && item.userData.image !== 'null' ? item.userData.image : assets.profile_pic} alt="" /> <p>{item.userData.name}</p>
                        </div>
                        <p className='max-sm:hidden'>{item.userData.dob ? (new Date().getFullYear() - new Date(item.userData.dob).getFullYear()) : 'N/A'}</p>
                        <p>{item.slotDate}, {item.slotTime}</p>
                        <div className='flex items-center gap-2'>
                            <img className='w-8 rounded-full bg-gray-200' src={item.docData.image && item.docData.image !== 'null' ? item.docData.image : assets.profile_pic} alt="" /> <p>{item.docData.name}</p>
                        </div>
                        <p>{currencySymbol}{item.amount}</p>
                        {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllAppointments
