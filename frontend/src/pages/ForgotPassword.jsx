import React, { useState } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await api.post('/auth/forgot-password', { email })
            if (data.success) {
                toast.success(data.message)
                setSubmitted(true)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className='min-h-[80vh] flex items-center justify-center p-4 animate-fade-in'>
                <div className='glass-card flex flex-col gap-6 m-auto items-center p-10 max-w-md w-full rounded-2xl animate-scale-in'>
                    <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-float'>
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div className='text-center'>
                        <p className='text-2xl font-bold text-gray-800'>Check Your Email</p>
                        <p className='text-gray-500 mt-2'>We've sent a password reset link to <br /><span className='font-semibold text-primary'>{email}</span></p>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        className='primary-gradient text-white w-full py-3 rounded-xl font-semibold shadow-lg shadow-emerald-200/50 hover:scale-[1.02] transition-all'
                    >
                        Back to Login
                    </button>
                    <p className='text-xs text-gray-400'>Didn't receive the email? Check your spam folder.</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-[80vh] flex items-center justify-center p-4 animate-fade-in'>
            <div className='glass-card flex flex-col gap-6 m-auto items-start p-10 max-w-md w-full rounded-2xl animate-slide-up shadow-2xl'>
                <div className='w-full'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>Forgot Password?</h2>
                    <p className='text-gray-500'>Don't worry, it happens. Enter your email and we'll send you a link to reset it.</p>
                </div>

                <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-4'>
                    <div className='w-full'>
                        <label className='text-sm font-medium text-gray-700 ml-1'>Email Address</label>
                        <div className='relative mt-1'>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='bg-gray-50/50 border border-gray-200 rounded-xl w-full p-3 pl-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none'
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                            </svg>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className='primary-gradient text-white w-full py-3 mt-2 rounded-xl font-semibold shadow-lg shadow-emerald-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        {loading ? (
                            <div className='flex items-center justify-center gap-2'>
                                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                <span>Sending...</span>
                            </div>
                        ) : 'Send Reset Link'}
                    </button>
                </form>

                <div className='w-full flex items-center justify-center mt-2'>
                    <button
                        onClick={() => navigate('/login')}
                        className='text-primary font-medium hover:underline flex items-center gap-1 transition-all'
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
