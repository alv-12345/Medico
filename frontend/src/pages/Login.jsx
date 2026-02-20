import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContextCore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../assets/assets'

const Login = () => {
  const [state, setState] = useState('Login') // Default to Login for better UX
  const [loginRole, setLoginRole] = useState('user')
  const { login, signup } = useContext(AuthContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (state === 'Sign Up') {
        await signup({ name, email, password });
      } else {
        await login(email, password, loginRole);
      }

      if (state === 'Sign Up' || loginRole === 'user') {
        navigate('/');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message || "Authentication failed", { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  }

  const roleOptions = [
    { id: 'user', label: 'Patient', icon: '👤' },
    { id: 'doctor', label: 'Doctor', icon: '🩺' },
    { id: 'admin', label: 'Admin', icon: '🛡️' }
  ]

  return (
    <div className='min-h-[85vh] flex items-center justify-center p-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='glass-card max-w-4xl w-full rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-emerald-100/20'
      >
        {/* Left Side: Branding/Instruction */}
        <div className='w-full md:w-1/3 primary-gradient p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden'>
          <div className='relative z-10'>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              src={assets.mlogo}
              className='w-24 mb-8 brightness-0 invert opacity-90'
              alt="Medico Logo"
            />
            <h1 className='text-3xl font-bold mb-4 tracking-tight'>
              {state === 'Sign Up' ? 'Join Medico Today' : 'Advance Your Health'}
            </h1>
            <p className='text-emerald-50/80 leading-relaxed font-medium'>
              {state === 'Sign Up'
                ? 'Create an account to manage your appointments and connect with top-rated medical professionals.'
                : 'Welcome back! Log in to access your personalized medical dashboard and history.'}
            </p>
          </div>

          <div className='mt-12 relative z-10'>
            <div className='flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10'>
              <p className='text-2xl'>{state === 'Sign Up' ? '🌟' : '🏥'}</p>
              <p className='text-xs font-medium'>Trusted by over 10,000 patients and 500+ clinics worldwide.</p>
            </div>
          </div>

          {/* Background Decorative Circles */}
          <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
          <div className='absolute top-0 -right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl'></div>
        </div>

        {/* Right Side: Form */}
        <div className='w-full md:w-2/3 p-8 md:p-12 bg-white/50 backdrop-blur-sm'>
          <div className='mb-8'>
            <div className='flex justify-between items-end'>
              <h2 className='text-2xl font-bold text-gray-800 uppercase tracking-wide'>{state}</h2>
              <span className='text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full'>SECURE ACCESS</span>
            </div>
            <div className='h-1 w-12 bg-primary rounded-full mt-2'></div>
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-5'>
            <AnimatePresence mode='wait'>
              {state === 'Login' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className='space-y-2'
                >
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest ml-1'>Access Level</label>
                  <div className='grid grid-cols-3 gap-3'>
                    {roleOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setLoginRole(opt.id)}
                        className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all flex flex-col items-center gap-1 ${loginRole === opt.id
                          ? 'bg-emerald-50 border-primary text-primary shadow-sm'
                          : 'bg-white border-gray-100 text-gray-400 hover:border-emerald-200 hover:text-emerald-600'
                          }`}
                      >
                        <span className='text-lg'>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {state === 'Sign Up' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className='space-y-1'
              >
                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest ml-1'>Full Name</label>
                <div className='relative group'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50 group-focus-within:opacity-100 transition-opacity'>👤</span>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 pl-12 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-700'
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </motion.div>
            )}

            <div className='space-y-1'>
              <label className='text-xs font-bold text-gray-500 uppercase tracking-widest ml-1'>Official Email</label>
              <div className='relative group'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50 group-focus-within:opacity-100 transition-opacity'>✉️</span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 pl-12 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-700'
                  type="email"
                  placeholder="name@healthcare.com"
                  required
                />
              </div>
            </div>

            <div className='space-y-1'>
              <div className='flex justify-between items-center ml-1'>
                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>Password</label>
                {state === 'Login' && (
                  <p onClick={() => navigate('/forgot-password')} className='text-primary text-[10px] font-bold cursor-pointer hover:underline uppercase'>Lost Password?</p>
                )}
              </div>
              <div className='relative group'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50 group-focus-within:opacity-100 transition-opacity'>🔒</span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className='w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 pl-12 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-700'
                  type="password"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className='primary-gradient text-white w-full py-4 mt-4 rounded-xl font-bold shadow-xl shadow-emerald-200/50 hover:shadow-emerald-300/60 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  <span>AUTHENTICATING...</span>
                </>
              ) : (state === 'Sign Up' ? 'CREATE SECURE ACCOUNT' : 'LOG INTO DASHBOARD')}
            </button>
          </form>

          <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
            <p className='text-gray-500 font-medium'>
              {state === 'Sign Up' ? 'Part of our network already?' : 'New to our medical platform?'}
              <button
                onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                className='ml-2 text-primary font-bold hover:text-emerald-700 transition-colors underline decoration-2 underline-offset-4'
              >
                {state === 'Sign Up' ? 'Log in here' : 'Join as member'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
