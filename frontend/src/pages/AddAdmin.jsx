import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AuthContext } from '../context/AuthContextCore'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddAdmin = () => {

    const { aToken, backendUrl } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            const { data } = await axios.post(backendUrl + '/api/admin/add-admin', { email, password }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setEmail('')
                setPassword('')
            } else {
                toast.error(data.message, { autoClose: 800 })
            }

        } catch (error) {
            toast.error(error.message, { autoClose: 800 })
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Admin</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <p>Admin Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Admin Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                    </div>
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Admin</button>
            </div>
        </form>
    )
}

export default AddAdmin
