import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContextCore'
import api from '../services/api'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const MyProfile = () => {

    const { user, loadUserProfileData: authLoadUserProfile } = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadUserProfileData = async () => {
        try {
            const { data } = await api.get('/user/get-profile')
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message, { autoClose: 1000 })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message, { autoClose: 1000 })
        }
    }

    const updateUserProfileData = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('dob', userData.dob)
            formData.append('gender', userData.gender)
            formData.append('address', JSON.stringify(userData.address))

            if (image) formData.append('image', image)

            const { data } = await api.post('/user/update-profile', formData)

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
                await authLoadUserProfile();
            } else {
                toast.error(data.message, { autoClose: 1000 })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message, { autoClose: 1000 })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            loadUserProfileData()
        }
    }, [user])

    if (!userData) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center'>
                <div className='w-12 h-12 border-4 border-emerald-100 border-t-primary rounded-full animate-spin'></div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-4xl mx-auto py-8'
        >
            <div className='flex flex-col md:flex-row gap-8'>

                {/* Left Column: Profile Card */}
                <div className='w-full md:w-1/3 flex flex-col gap-6'>
                    <div className='glass-card p-6 rounded-3xl flex flex-col items-center text-center border border-emerald-100/30 shadow-lg relative overflow-hidden'>
                        <div className='absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-emerald-400/20 to-blue-400/20'></div>

                        <div className='relative mt-8 mb-4 group'>
                            {isEdit ? (
                                <label htmlFor="image" className='cursor-pointer block relative'>
                                    <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md relative'>
                                        <img className='w-full h-full object-cover opacity-80' src={image ? URL.createObjectURL(image) : (userData.image && userData.image !== 'null' ? userData.image : assets.profile_pic)} alt="" />
                                        <div className='absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <img className='w-10 invert brightness-0' src={assets.upload_icon} alt="Upload" />
                                        </div>
                                    </div>
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                </label>
                            ) : (
                                <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md'>
                                    <img className='w-full h-full object-cover' src={userData.image && userData.image !== 'null' ? userData.image : assets.profile_pic} alt="" />
                                </div>
                            )}
                        </div>

                        {isEdit ? (
                            <input
                                className='bg-emerald-50 border border-emerald-200 text-xl font-bold text-center w-full rounded-lg py-1 px-2 outline-none focus:ring-2 focus:ring-primary/20 transition-all'
                                type="text"
                                value={userData.name}
                                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        ) : (
                            <h2 className='text-2xl font-bold text-gray-800'>{userData.name}</h2>
                        )}
                        <p className='text-gray-500 font-medium text-sm mt-1'>Patient</p>

                        <div className='flex items-center gap-2 mt-6 w-full'>
                            <button
                                onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
                                disabled={loading}
                                className={`flex-1 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all ${isEdit
                                    ? 'bg-primary text-white shadow-emerald-200/50 hover:bg-emerald-600'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-700'
                                    }`}
                            >
                                {loading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Edit Profile')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className='w-full md:w-2/3 flex flex-col gap-6'>

                    {/* Contact Info Section */}
                    <div className='glass-card p-6 rounded-3xl border border-emerald-100/30 shadow-sm'>
                        <h3 className='text-gray-800 font-bold text-lg mb-4 flex items-center gap-2'>
                            <span className='w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-lg'>📞</span>
                            Contact Information
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Email Address</p>
                                <p className='text-gray-700 font-medium truncate'>{userData.email}</p>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Phone Number</p>
                                {isEdit ? (
                                    <input
                                        className='bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full text-sm font-medium outline-none focus:border-primary transition-colors'
                                        type="text"
                                        value={userData.phone}
                                        onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                    />
                                ) : (
                                    <p className='text-gray-700 font-medium'>{userData.phone}</p>
                                )}
                            </div>

                            <div className='flex flex-col gap-1 md:col-span-2'>
                                <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Address</p>
                                {isEdit ? (
                                    <div className='grid grid-cols-2 gap-4'>
                                        <input
                                            className='bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full text-sm font-medium outline-none focus:border-primary transition-colors'
                                            type="text"
                                            value={userData.address.line1}
                                            onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                            placeholder="Line 1"
                                        />
                                        <input
                                            className='bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full text-sm font-medium outline-none focus:border-primary transition-colors'
                                            type="text"
                                            value={userData.address.line2}
                                            onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                            placeholder="Line 2"
                                        />
                                    </div>
                                ) : (
                                    <p className='text-gray-700 font-medium'>
                                        {userData.address.line1}<br />
                                        {userData.address.line2}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Basic Info Section */}
                    <div className='glass-card p-6 rounded-3xl border border-emerald-100/30 shadow-sm'>
                        <h3 className='text-gray-800 font-bold text-lg mb-4 flex items-center gap-2'>
                            <span className='w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-lg'>📋</span>
                            Basic Information
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Gender</p>
                                {isEdit ? (
                                    <select
                                        className='bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full text-sm font-medium outline-none focus:border-primary transition-colors'
                                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                        value={userData.gender}
                                    >
                                        <option value="Not Selected">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                ) : (
                                    <p className='text-gray-700 font-medium'>{userData.gender === "Not Selected" ? "Not Selected" : userData.gender}</p>
                                )}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Date of Birth</p>
                                {isEdit ? (
                                    <input
                                        className='bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full text-sm font-medium outline-none focus:border-primary transition-colors'
                                        type="date"
                                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                        value={userData.dob}
                                    />
                                ) : (
                                    <p className='text-gray-700 font-medium'>{userData.dob}</p>
                                )}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </motion.div>
    )
}

export default MyProfile
