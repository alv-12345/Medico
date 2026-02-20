import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='py-12'
    >
      {/* --- Page Header --- */}
      <div className='text-center mb-16'>
        <Reveal width="100%">
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            About <span className='text-gradient'>Medico</span>
          </h1>
        </Reveal>
        <Reveal width="100%" delay={0.2}>
          <p className='text-gray-500 max-w-2xl mx-auto font-medium'>
            Revolutionizing healthcare accessibility through technology, heart, and clinical excellence.
          </p>
        </Reveal>
      </div>

      {/* --- Main Content Section --- */}
      <div className='flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-24'>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='w-full lg:w-1/2 relative'
        >
          <div className='absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse'></div>
          <div className='absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse'></div>
          <img
            className='w-full rounded-3xl shadow-2xl relative z-10 border border-white/20'
            src={assets.about_image}
            alt="Medical Professional"
          />
        </motion.div>

        <div className='w-full lg:w-1/2 flex flex-col gap-8'>
          <Reveal>
            <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>
              Your Trusted Partner in <br />
              <span className='text-primary'>Modern Healthcare</span>
            </h2>
          </Reveal>

          <div className='space-y-6 text-gray-600 leading-relaxed font-medium'>
            <Reveal delay={0.1}>
              <p>
                At Medico, we bridge the gap between world-class medical expertise and the patients who need it most. Our platform is more than just an appointment system; it's a integrated healthcare ecosystem designed to prioritize your well-being through every step of your journey.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                We collaborate with top-tier medical specialists, ensuring that excellence in care is never more than a click away. Our commitment to innovation drives us to continuously improve our facilities and digital services, making health management seamless for both patients and providers.
              </p>
            </Reveal>
          </div>

          <div className='grid grid-cols-2 gap-6 pt-4'>
            <div className='p-4 rounded-2xl bg-emerald-50 border border-emerald-100'>
              <p className='text-2xl font-bold text-primary'>500+</p>
              <p className='text-xs text-gray-500 font-bold uppercase tracking-wider'>Specialists</p>
            </div>
            <div className='p-4 rounded-2xl bg-blue-50 border border-blue-100'>
              <p className='text-2xl font-bold text-blue-600'>10k+</p>
              <p className='text-xs text-gray-500 font-bold uppercase tracking-wider'>Happy Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Vision & Mission --- */}
      <Reveal width="100%">
        <div className='primary-gradient rounded-[2rem] p-12 text-white mb-24 relative overflow-hidden shadow-2xl'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32'></div>
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl -ml-24 -mb-24'></div>

          <div className='relative z-10 flex flex-col md:flex-row gap-12 items-center'>
            <div className='md:w-1/3'>
              <h3 className='text-4xl font-black mb-2'>Our Vision</h3>
              <div className='w-12 h-1 bg-white/40 rounded-full'></div>
            </div>
            <div className='md:w-2/3'>
              <p className='text-xl md:text-2xl font-medium leading-relaxed italic opacity-90'>
                "To define the future of healthcare by making expert medical care accessible, transparent, and personalized for every individual across the globe."
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* --- Why Choose Us --- */}
      <div className='mb-24'>
        <div className='flex items-center gap-4 mb-12'>
          <h2 className='text-3xl font-bold text-gray-900'>Why <span className='text-gradient'>Choose Us</span></h2>
          <div className='flex-1 h-px bg-gray-100'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              title: "Clinical Efficiency",
              desc: "Integrated scheduling systems designed to minimize wait times and maximize care quality.",
              icon: "⚡",
              color: "emerald"
            },
            {
              title: "Unified Convenience",
              desc: "Your entire medical world in one place—from doctor search to history tracking.",
              icon: "🌍",
              color: "blue"
            },
            {
              title: "Personalized Care",
              desc: "Health reminders and recommendations tailored specifically to your unique medical profile.",
              icon: "🛡️",
              color: "emerald"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className='glass-card p-10 rounded-3xl border border-gray-100/50 hover:border-primary/30 transition-all group'
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-inner ${item.color === 'emerald' ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                {item.icon}
              </div>
              <h4 className='text-xl font-bold text-gray-800 mb-4'>{item.title}</h4>
              <p className='text-gray-500 text-sm font-medium leading-relaxed'>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default About


