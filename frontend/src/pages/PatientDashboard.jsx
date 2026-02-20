import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = ({ user }) => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate()

    const fetchPatientData = async () => {
        try {
            const { data } = await api.get('/user/appointments');
            if (data.success) {
                setAppointments(data.appointments);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchPatientData();
        }
    }, [user]);

    return (
        <div className='p-5 font-medium text-gray-900'>
            <div className='mt-8 flex flex-col gap-6'>
                <p className='text-xl font-semibold'>Role: <span className='text-primary capitalize'>{user.role || 'Patient'}</span></p>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div onClick={() => navigate('/my-appointments')} className='p-6 bg-blue-50 border rounded-xl hover:shadow-md transition-all cursor-pointer'>
                        <p className='text-lg'>Total Appointments</p>
                        <p className='text-3xl font-bold text-primary'>{appointments.length}</p>
                        <p className='text-xs text-gray-500 mt-2'>Click to view all</p>
                    </div>

                    <div onClick={() => navigate('/my-profile')} className='p-6 bg-green-50 border rounded-xl hover:shadow-md transition-all cursor-pointer'>
                        <p className='text-lg'>Profile Status</p>
                        <p className='text-xl font-bold text-green-600'>View / Edit</p>
                        <p className='text-xs text-gray-500 mt-2'>Manage your medical records</p>
                    </div>

                    <div onClick={() => navigate('/doctors')} className='p-6 bg-purple-50 border rounded-xl hover:shadow-md transition-all cursor-pointer'>
                        <p className='text-lg'>Find Doctors</p>
                        <p className='text-xl font-bold text-purple-600'>Explore</p>
                        <p className='text-xs text-gray-500 mt-2'>Book new appointments</p>
                    </div>
                </div>

                {appointments.length > 0 && (
                    <div className='mt-10'>
                        <h2 className='text-2xl mb-4'>Upcoming Appointments</h2>
                        <div className='flex flex-col gap-3'>
                            {appointments.slice(0, 3).map((item, index) => (
                                <div key={index} className='flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm'>
                                    <img className='w-16 rounded-full bg-gray-100' src={item.docData.image && item.docData.image !== 'null' ? item.docData.image : assets.profile_pic} alt="" />
                                    <div className='flex-1'>
                                        <p className='font-bold text-lg'>{item.docData.name}</p>
                                        <p className='text-gray-500'>{item.docData.speciality}</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='font-medium'>{item.slotDate}</p>
                                        <p className='text-gray-400'>{item.slotTime}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDashboard;
