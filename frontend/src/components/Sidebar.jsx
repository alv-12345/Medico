
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContextCore'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const { role } = useContext(AuthContext)

    if (role !== 'admin' && role !== 'doctor') return null;

    return (
        <div className='min-h-screen bg-white/50 backdrop-blur-md border-r border-emerald-100/30'>
            <ul className='text-[#515151] mt-5'>

                <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? 'bg-emerald-50 border-r-4 border-primary text-primary font-bold' : 'hover:bg-emerald-50/50'}`} to={'/dashboard'}>
                    <img className='w-5' src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                {role === 'admin' ? (
                    <>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? 'bg-emerald-50 border-r-4 border-primary text-primary font-bold' : 'hover:bg-emerald-50/50'}`} to={'/all-appointments'}>
                            <img className='w-5' src={assets.appointment_icon} alt="" />
                            <p className='hidden md:block'>Appointments</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? 'bg-emerald-50 border-r-4 border-primary text-primary font-bold' : 'hover:bg-emerald-50/50'}`} to={'/add-doctor'}>
                            <img className='w-5' src={assets.add_icon} alt="" />
                            <p className='hidden md:block'>Add Doctor</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? 'bg-emerald-50 border-r-4 border-primary text-primary font-bold' : 'hover:bg-emerald-50/50'}`} to={'/doctor-list'}>
                            <img className='w-5' src={assets.people_icon} alt="" />
                            <p className='hidden md:block'>Doctors List</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? 'bg-emerald-50 border-r-4 border-primary text-primary font-bold' : 'hover:bg-emerald-50/50'}`} to={'/add-admin'}>
                            <img className='w-5' src={assets.people_icon} alt="" />
                            <p className='hidden md:block'>Add Admin</p>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? 'bg-emerald-50 border-r-4 border-primary text-primary font-bold' : 'hover:bg-emerald-50/50'}`} to={'/doctor-appointments'}>
                            <img className='w-5' src={assets.appointment_icon} alt="" />
                            <p className='hidden md:block'>All Appointments</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all ${isActive ? 'bg-emerald-50 border-r-4 border-primary text-primary font-bold' : 'hover:bg-emerald-50/50'}`} to={'/doctor-profile'}>
                            <img className='w-5' src={assets.people_icon} alt="" />
                            <p className='hidden md:block'>Profile</p>
                        </NavLink>
                    </>
                )}

            </ul>
        </div>
    )
}

export default Sidebar
