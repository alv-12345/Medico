import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContextCore'
import { AppContext } from '../context/AppContext'
import api from '../services/api'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const DoctorProfile = () => {

    const { user, role, loadUserProfileData } = useContext(AuthContext)
    const { currencySymbol } = useContext(AppContext)
    const [profileData, setProfileData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const getProfileData = async () => {
        try {
            const { data } = await api.get('/doctor/profile')
            if (data.success) {
                setProfileData(data.profileData)
            } else {
                toast.error(data.message, { autoClose: 800 })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message, { autoClose: 800 })
        }
    }

    const updateProfile = async () => {
        try {
            const formData = new FormData()
            formData.append('docId', profileData._id)
            formData.append('fees', profileData.fees)
            formData.append('address', JSON.stringify(profileData.address))
            formData.append('available', profileData.available)

            if (image) formData.append('image', image)

            const { data } = await api.post('/doctor/update-profile', formData)

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                setImage(false)
                getProfileData()
                // Sync with Context
                await loadUserProfileData();
            } else {
                toast.error(data.message, { autoClose: 800 })
            }

        } catch (error) {
            toast.error(error.message, { autoClose: 800 })
            console.log(error)
        }
    }

    useEffect(() => {
        if (role === 'doctor') {
            getProfileData()
        }
    }, [role])

    if (!profileData) {
        return <div className='min-h-[60vh] flex items-center justify-center'>Loading...</div>
    }

    return (
        <div className='flex flex-col gap-4 m-5'>
            <div>
                <div className='flex flex-col gap-4 max-w-lg'>

                    {
                        isEdit
                            ? <label htmlFor="image">
                                <div className='inline-block relative cursor-pointer'>
                                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg opacity-75' src={image ? URL.createObjectURL(image) : (profileData.image && profileData.image !== 'null' ? profileData.image : assets.profile_pic)} alt="" />
                                    <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                            : <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image && profileData.image !== 'null' ? profileData.image : assets.profile_pic} alt="" />
                    }

                    <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                        {/* Doc Info : Name, Degree, Experience */}

                        <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                        <div className='flex items-center gap-2 mt-1 text-gray-600'>
                            <p>{profileData.degree} - {profileData.speciality}</p>
                            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                        </div>

                        {/* Doc About */}
                        <div>
                            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About <img src={assets.info_icon} alt="" /></p>
                            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                                {profileData.about}
                            </p>
                        </div>

                        <p className='text-gray-600 font-medium mt-4'>
                            Appointment fee: <span className='text-gray-800'>{currencySymbol} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
                        </p>

                        <div className='flex gap-2 py-2'>
                            <p>Address:</p>
                            <p className='text-sm'>
                                {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
                                <br />
                                {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
                            </p>
                        </div>

                        <div className='flex gap-1 pt-2'>
                            <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" name="" id="" />
                            <label htmlFor="">Available</label>
                        </div>

                        {
                            isEdit
                                ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                                : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                        }


                    </div>
                </div>
            </div>

        </div>
    )
}

export default DoctorProfile
