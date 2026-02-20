import React, { useState } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { token } = useParams()
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match")
        }
        setLoading(true)
        try {
            const { data } = await api.post(`/auth/reset-password/${token}`, { newPassword })
            if (data.success) {
                toast.success(data.message)
                setIsSuccess(true)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            toast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className='min-h-[80vh] flex items-center justify-center p-4 animate-fade-in'>
                <div className='glass-card flex flex-col gap-6 m-auto items-center p-10 max-w-md w-full rounded-2xl animate-scale-in'>
                    <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-float'>
                        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className='text-center'>
                        <p className='text-2xl font-bold text-gray-800 uppercase tracking-tight'>Success!</p>
                        <p className='text-gray-500 mt-2'>Your password has been reset successfully. You can now log in with your new password.</p>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        className='primary-gradient text-white w-full py-3 rounded-xl font-semibold shadow-lg shadow-emerald-200/50 hover:scale-[1.02] transition-all'
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-[80vh] flex items-center justify-center p-4 animate-fade-in'>
            <div className='glass-card flex flex-col gap-6 m-auto items-start p-10 max-w-md w-full rounded-2xl animate-slide-up shadow-2xl'>
                <div className='w-full'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>New Password</h2>
                    <p className='text-gray-500'>Secure your account with a strong password. Use a mix of letters, numbers, and symbols.</p>
                </div>

                <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-4 text-sm'>
                    <div className='w-full'>
                        <label className='text-sm font-medium text-gray-700 ml-1'>New Password</label>
                        <div className='relative mt-1'>
                            <input
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                className='bg-gray-50/50 border border-gray-200 rounded-xl w-full p-3 pl-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none'
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                    </div>

                    <div className='w-full'>
                        <label className='text-sm font-medium text-gray-700 ml-1'>Confirm Password</label>
                        <div className='relative mt-1'>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                className='bg-gray-50/50 border border-gray-200 rounded-xl w-full p-3 pl-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none'
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className='primary-gradient text-white w-full py-3 mt-4 rounded-xl font-semibold shadow-lg shadow-emerald-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        {loading ? (
                            <div className='flex items-center justify-center gap-2'>
                                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                <span>Updating...</span>
                            </div>
                        ) : 'Reset Password'}
                    </button>
                </form>

                <div className='w-full flex items-center justify-center mt-2'>
                    <button
                        onClick={() => navigate('/login')}
                        className='text-gray-400 text-xs hover:text-primary transition-all'
                    >
                        Cancel and return to login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
