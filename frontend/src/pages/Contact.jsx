import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Contact = () => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'
    >

      <div className='text-center mb-16'>
        <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl text-gradient'>Get in Touch</h2>
        <p className='mt-4 text-lg text-gray-500'>We'd love to hear from you. Here's how you can reach us.</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>

        {/* Contact Info Card */}
        <div className='glass-card p-8 rounded-3xl border border-emerald-100/30 shadow-lg relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full opacity-50'></div>

          <h3 className='text-2xl font-bold text-gray-800 mb-8'>Contact Information</h3>

          <div className='flex flex-col gap-8'>
            <div className='flex items-start gap-4'>
              <div className='w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-2xl flex-shrink-0'>
                📍
              </div>
              <div>
                <p className='font-bold text-gray-800 text-lg mb-1'>Our Office</p>
                <p className='text-gray-600 leading-relaxed'>
                  54709 Willms Station<br />
                  Jayanagar 3rd Block, Jayanagar,<br />
                  Bengaluru
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0'>
                📞
              </div>
              <div>
                <p className='font-bold text-gray-800 text-lg mb-1'>Phone & Email</p>
                <p className='text-gray-600 mb-1'>Tel: 080-2457613</p>
                <p className='text-emerald-600 font-medium'>Email: medico@gmail.com</p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-2xl flex-shrink-0'>
                ⏰
              </div>
              <div>
                <p className='font-bold text-gray-800 text-lg mb-1'>Working Hours</p>
                <p className='text-gray-600'>Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className='text-gray-600'>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className='mt-12 pt-8 border-t border-gray-100'>
            <img className='w-full rounded-2xl shadow-sm opacity-90' src={assets.contact_image} alt="Office" />
          </div>
        </div>

        {/* Patient Reviews */}
        <div className='flex flex-col gap-6'>
          <h3 className='text-2xl font-bold text-gray-800 mb-2 px-2'>What Our Patients Say</h3>

          <div className='grid grid-cols-1 gap-6'>
            {[
              {
                name: "Sarah Johnson",
                role: "Patient",
                review: "The doctors at Medico are incredibly professional. I felt heard and cared for throughout my entire treatment process.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Patient",
                review: "Booking an appointment was seamless. The facility is state-of-the-art and the staff is very friendly.",
                rating: 5
              },
              {
                name: "Emily Davis",
                role: "Patient",
                review: "Dr. Smith explained everything clearly and made me feel at ease. Highly recommend Medico for anyone looking for quality care.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className='glass-card p-6 rounded-2xl border border-emerald-100/50 shadow-sm relative'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg'>
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className='font-bold text-gray-800 text-sm'>{testimonial.name}</h4>
                      <p className='text-xs text-gray-500'>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className='flex text-yellow-400 text-sm'>
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
                <p className='text-gray-600 text-sm italic leading-relaxed'>"{testimonial.review}"</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </motion.div>
  )
}

export default Contact
