import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContextCore'
import api from '../services/api'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../assets/assets'
import { PayPalButtons } from "@paypal/react-paypal-js";

const MyAppointments = () => {

    const { user } = useContext(AuthContext)
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [paymentId, setPaymentId] = useState(null)

    const getUserAppointments = async () => {
        try {
            setLoading(true)
            const { data } = await api.get('/user/appointments')
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message, { autoClose: 1000 })
        } finally {
            setLoading(false)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await api.post('/user/cancel-appointment', { appointmentId })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message, { autoClose: 1000 })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message, { autoClose: 1000 })
        }
    }

    useEffect(() => {
        if (user) {
            getUserAppointments()
        }
    }, [user])

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemAnim = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='py-8'
        >
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
                <div>
                    <h1 className='text-3xl font-bold text-gradient'>My Appointments</h1>
                    <p className='text-gray-500 mt-1 font-medium'>Manage and track your scheduled medical consultations.</p>
                </div>
                <div className='flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100'>
                    <span className='text-emerald-600 font-bold'>{appointments.length}</span>
                    <span className='text-emerald-800 text-sm font-medium'>Total Appointments</span>
                </div>
            </div>

            {loading ? (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className='h-48 bg-gray-100 animate-pulse rounded-3xl'></div>
                    ))}
                </div>
            ) : appointments.length > 0 ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className='grid grid-cols-1 lg:grid-cols-2 gap-6'
                >
                    <AnimatePresence>
                        {appointments.map((item, index) => (
                            <motion.div
                                key={item._id}
                                variants={itemAnim}
                                layout
                                className='glass-card group overflow-hidden rounded-3xl border border-emerald-100/20 hover:border-primary/30 transition-all hover:shadow-xl p-5 flex flex-col sm:flex-row gap-5 relative bg-white/40'
                            >
                                {/* Status Badge */}
                                <div className='absolute top-4 right-4 z-10'>
                                    {item.cancelled ? (
                                        <span className='bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full border border-red-100 uppercase tracking-wider'>Cancelled</span>
                                    ) : item.isCompleted ? (
                                        <span className='bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider'>Completed</span>
                                    ) : (
                                        <span className='bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider animate-pulse'>Upcoming</span>
                                    )}
                                </div>

                                {/* Doctor Image */}
                                <div className='shrink-0 w-full sm:w-32 h-40 rounded-2xl overflow-hidden bg-emerald-50/50 relative'>
                                    <img
                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                        src={item.docData.image && item.docData.image !== 'null' ? item.docData.image : assets.profile_pic}
                                        alt={item.docData.name}
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                </div>

                                {/* Appointment Info */}
                                <div className='flex-1 flex flex-col justify-between'>
                                    <div>
                                        <p className='text-lg font-bold text-gray-800 group-hover:text-primary transition-colors'>{item.docData.name}</p>
                                        <p className='text-primary text-xs font-bold uppercase tracking-widest mt-0.5'>{item.docData.speciality}</p>

                                        <div className='mt-4 space-y-2'>
                                            <div className='flex items-center gap-2 text-gray-600'>
                                                <span className='text-sm'>📅</span>
                                                <p className='text-xs font-semibold'><span className='text-gray-400 font-medium'>Date:</span> {item.slotDate}</p>
                                            </div>
                                            <div className='flex items-center gap-2 text-gray-600'>
                                                <span className='text-sm'>🕒</span>
                                                <p className='text-xs font-semibold'><span className='text-gray-400 font-medium'>Time:</span> {item.slotTime}</p>
                                            </div>
                                            <div className='flex items-start gap-2 text-gray-600'>
                                                <span className='text-sm'>📍</span>
                                                <div>
                                                    <p className='text-[10px] font-bold uppercase text-gray-400'>Location</p>
                                                    <p className='text-[11px] font-medium leading-tight'>{item.docData.address.line1}, {item.docData.address.line2}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className='flex flex-col gap-2 mt-5'>
                                        {!item.cancelled && !item.isCompleted && !item.payment && (
                                            <>
                                                {paymentId === item._id ? (
                                                    <div className='w-full'>
                                                        <PayPalButtons
                                                            style={{ layout: "vertical", height: 35 }}
                                                            createOrder={async () => {
                                                                try {
                                                                    const { data } = await api.post('/user/payment-paypal', { appointmentId: item._id });
                                                                    if (data.success) {
                                                                        return data.orderID;
                                                                    } else {
                                                                        toast.error(data.message);
                                                                        return null;
                                                                    }
                                                                } catch (err) {
                                                                    toast.error(err.message);
                                                                    return null;
                                                                }
                                                            }}
                                                            onApprove={async (data) => {
                                                                try {
                                                                    const { data: verifyData } = await api.post('/user/verify-paypal', { orderID: data.orderID, appointmentId: item._id });
                                                                    if (verifyData.success) {
                                                                        toast.success("Payment Successful");
                                                                        getUserAppointments();
                                                                        setPaymentId(null);
                                                                    } else {
                                                                        toast.error(verifyData.message);
                                                                    }
                                                                } catch (err) {
                                                                    toast.error(err.message);
                                                                }
                                                            }}
                                                            onCancel={() => {
                                                                setPaymentId(null);
                                                                toast.info("Payment Cancelled");
                                                            }}
                                                            onError={(err) => {
                                                                console.error("PayPal Error:", err);
                                                                toast.error("PayPal Payment Error");
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() => setPaymentId(null)}
                                                            className='w-full text-[10px] font-bold py-1 text-gray-400 hover:text-gray-600'
                                                        >
                                                            Back
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className='flex gap-2 w-full'>
                                                        <button
                                                            onClick={() => setPaymentId(item._id)}
                                                            className='flex-1 text-[11px] font-bold py-2.5 px-3 rounded-xl bg-primary text-white shadow-lg shadow-emerald-200/50 hover:bg-emerald-600 transition-all uppercase tracking-wider'
                                                        >
                                                            Pay with PayPal
                                                        </button>
                                                        <button
                                                            onClick={() => cancelAppointment(item._id)}
                                                            className='flex-1 text-[11px] font-bold py-2.5 px-3 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition-all uppercase tracking-wider'
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {item.cancelled && (
                                            <button disabled className='w-full text-[11px] font-bold py-2.5 rounded-xl border border-gray-100 text-gray-400 bg-gray-50/50 uppercase tracking-wider cursor-not-allowed'>Action Restricted</button>
                                        )}
                                        {item.isCompleted && (
                                            <button className='w-full text-[11px] font-bold py-2.5 rounded-xl border border-emerald-100 text-emerald-600 bg-emerald-50/30 uppercase tracking-wider hover:bg-emerald-50 transition-all'>Download Report</button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='flex flex-col items-center justify-center py-24 glass-card rounded-3xl border-dashed border-2 border-emerald-100'
                >
                    <div className='w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6'>
                        <span className='text-4xl'>📅</span>
                    </div>
                    <h3 className='text-xl font-bold text-gray-800'>No Appointments Found</h3>
                    <p className='text-gray-500 mt-2 max-w-xs text-center font-medium'>You haven't scheduled any consultations yet. Start exploring our trusted doctors.</p>
                    <button
                        onClick={() => navigate('/doctors')}
                        className='mt-6 px-8 py-3 primary-gradient text-white rounded-full font-bold shadow-lg shadow-emerald-200/50 hover:scale-105 active:scale-95 transition-all uppercase text-xs tracking-widest'
                    >
                        Find a Doctor
                    </button>
                </motion.div>
            )}
        </motion.div>
    )
}

export default MyAppointments
