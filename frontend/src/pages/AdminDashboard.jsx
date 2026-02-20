import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextCore';
import api from '../services/api';
import { assets } from '../assets/assets';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [dashData, setDashData] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const getDashData = async () => {
        try {
            const { data } = await api.get('/admin/dashboard');
            if (data.success) {
                setDashData(data.dashData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAppointments = async () => {
        try {
            const { data } = await api.get('/admin/appointments');
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.error(error);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await api.post('/admin/cancel-appointment', { appointmentId });
            if (data.success) {
                getDashData();
                getAppointments();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            getDashData();
            getAppointments();
        }
    }, [user]);

    if (!dashData) return <div className='p-10 text-center'>Loading...</div>;

    return (
        <div className='m-5'>
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.doctor_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
                        <p className='text-gray-400'>Doctors</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>

            <div className='bg-white mt-10 rounded border'>
                <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b'>
                    <img src={assets.list_icon} alt="" />
                    <p className='font-semibold'>Latest Bookings</p>
                </div>

                <div className='pt-4 border border-t-0'>
                    {appointments.slice(0, 5).map((item, index) => (
                        <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                            <img className='rounded-full w-10' src={item.docData.image} alt="" />
                            <div className='flex-1 text-sm'>
                                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                                <p className='text-gray-600'>{item.slotDate}</p>
                            </div>
                            {item.cancelled ? (
                                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                            ) : item.isCompleted ? (
                                <p className='text-green-500 text-xs font-medium'>Completed</p>
                            ) : (
                                <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
