import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextCore';
import { AppContext } from '../context/AppContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const DoctorAppointments = () => {
    const { user } = useContext(AuthContext);
    const { currencySymbol } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const { data } = await api.get('/doctor/appointments');
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await api.post('/doctor/complete-appointment', { appointmentId });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await api.post('/doctor/cancel-appointment', { appointmentId });
            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            getAppointments();
        }
    }, [user]);

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {appointments.map((item, index) => (
                    <div className='flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img className='w-8 rounded-full' src={item.userData.image && item.userData.image !== 'null' ? item.userData.image : assets.profile_pic} alt="" />
                            <p>{item.userData.name}</p>
                        </div>
                        <div>
                            <p className='text-xs inline border border-primary px-2 rounded-full'>
                                {item.payment ? 'Online' : 'CASH'}
                            </p>
                        </div>
                        <p className='max-sm:hidden'>{item.userData.dob ? (new Date().getFullYear() - new Date(item.userData.dob).getFullYear()) : 'N/A'}</p>
                        <p>{item.slotDate}, {item.slotTime}</p>
                        <p>{currencySymbol}{item.amount}</p>
                        {item.cancelled ? (
                            <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                        ) : item.isCompleted ? (
                            <p className='text-green-500 text-xs font-medium'>Completed</p>
                        ) : (
                            <div className='flex items-center gap-4'>
                                <img
                                    onClick={() => cancelAppointment(item._id)}
                                    className='w-10 cursor-pointer hover:scale-110 transition-all'
                                    src={assets.cancel_icon}
                                    title="Cancel Appointment"
                                    alt="Cancel"
                                />
                                <img
                                    onClick={() => completeAppointment(item._id)}
                                    className='w-10 cursor-pointer hover:scale-110 transition-all'
                                    src={assets.tick_icon}
                                    title="Mark Completed"
                                    alt="Complete"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointments;
