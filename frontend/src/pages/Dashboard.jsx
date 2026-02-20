import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContextCore';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const { user, role } = useContext(AuthContext);

    if (!user) {
        return <div className='p-10'>Please login to access dashboard.</div>
    }

    return (
        <div className='p-5 font-medium text-gray-900'>
            <h1 className='text-3xl pb-3 border-b'>Welcome, {user?.name || (role === 'admin' ? 'Admin' : role === 'doctor' ? 'Doctor' : 'User')}</h1>

            {role === 'admin' ? (
                <AdminDashboard />
            ) : role === 'doctor' ? (
                <DoctorDashboard />
            ) : (
                <PatientDashboard user={user} />
            )}
        </div>
    );
};

export default Dashboard;
