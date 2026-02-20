import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextCore';
import { AppContext } from '../context/AppContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const DoctorDashboard = () => {
    const { user } = useContext(AuthContext);
    const { currencySymbol } = useContext(AppContext);
    const [dashData, setDashData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const getDashData = async () => {
        try {
            const { data } = await api.get('/doctor/dashboard');
            if (data.success) {
                setDashData(data.dashData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAppointments = async () => {
        try {
            const { data } = await api.get('/doctor/appointments');
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getProfile = async () => {
        try {
            const { data } = await api.get('/doctor/profile');
            if (data.success) {
                setUnavailableDates(data.profileData.unavailableDates || []);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateUnavailableDate = async (date) => {
        try {
            const { data } = await api.post('/doctor/update-unavailable-dates', { date });
            if (data.success) {
                toast.success(data.message);
                getProfile();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await api.post('/doctor/complete-appointment', { appointmentId });
            if (data.success) {
                toast.success(data.message);
                getDashData();
                getAppointments();
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 800 });
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await api.post('/doctor/cancel-appointment', { appointmentId });
            if (data.success) {
                toast.success(data.message);
                getDashData();
                getAppointments();
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 800 });
        }
    };

    useEffect(() => {
        if (user) {
            getDashData();
            getAppointments();
            getProfile();
        }
    }, [user]);

    if (!dashData) return <div className='p-10 text-center'>Loading...</div>;

    return (
        <div className='m-5'>
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.earning_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{currencySymbol} {dashData.earnings}</p>
                        <p className='text-gray-400'>Earnings</p>
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

            <div className='bg-white mt-10 rounded border p-6'>
                <p className='font-semibold text-lg mb-4 text-gray-700 underline'>Unavailable Dates (Leave Days)</p>
                <div className='flex items-center gap-4 mb-6'>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className='border rounded px-3 py-2 outline-none focus:border-primary transition-all'
                    />
                    <button
                        onClick={() => {
                            if (selectedDate) {
                                updateUnavailableDate(selectedDate);
                                setSelectedDate('');
                            } else {
                                toast.warn('Please select a date');
                            }
                        }}
                        className='bg-primary text-white py-2 px-6 rounded hover:bg-[#4d66ff] transition-all'
                    >
                        Mark Unavailable
                    </button>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {unavailableDates.length > 0 ? (
                        unavailableDates.map((date, index) => (
                            <div key={index} className='flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm border border-gray-200'>
                                <span>{date}</span>
                                <button
                                    onClick={() => updateUnavailableDate(date)}
                                    className='text-xs text-red-500 hover:text-red-700 font-medium underline transition-all'
                                >
                                    Cancel
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-400 text-sm'>No unavailable dates marked.</p>
                    )}
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
                            <img className='rounded-full w-10' src={item.userData.image && item.userData.image !== 'null' ? item.userData.image : assets.profile_pic} alt="" />
                            <div className='flex-1 text-sm'>
                                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                                <p className='text-gray-600'>{item.slotDate}</p>
                            </div>
                            {item.cancelled ? (
                                <p className='text-red-400 text-xs font-medium uppercase'>Cancelled</p>
                            ) : item.isCompleted ? (
                                <p className='text-green-500 text-xs font-medium uppercase'>Completed</p>
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <img
                                        onClick={() => cancelAppointment(item._id)}
                                        className='w-10 cursor-pointer hover:scale-110 active:scale-95 transition-all'
                                        src={assets.cancel_icon}
                                        title="Cancel Appointment"
                                        alt="Cancel"
                                    />
                                    <img
                                        onClick={() => completeAppointment(item._id)}
                                        className='w-10 cursor-pointer hover:scale-110 active:scale-95 transition-all'
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
        </div>
    );
};

export default DoctorDashboard;
