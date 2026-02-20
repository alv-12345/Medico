import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import AddDoctor from './pages/AddDoctor'
import DoctorsList from './pages/DoctorsList'
import AllAppointments from './pages/AllAppointments'
import AddAdmin from './pages/AddAdmin'
import DoctorProfile from './pages/DoctorProfile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

import MyProfile from './pages/Myprofile'
import MyAppointments from './pages/MyAppointments'
import Dashboard from './pages/Dashboard'
import DoctorAppointments from './pages/DoctorAppointments'
import ChatBox from './components/ChatBox'
import Reviews from './pages/Reviews'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useContext } from 'react'
import { AuthContext } from './context/AuthContextCore'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './components/PageTransition'
import AnimatedBackground from './components/AnimatedBackground'

const App = () => {
  const { loading, user } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      const publicRoutes = ['/login', '/about', '/contact', '/', '/doctors', '/forgot-password', '/reset-password']
      const isPublic = publicRoutes.some(path =>
        location.pathname === path ||
        location.pathname.startsWith('/doctors') ||
        location.pathname.startsWith('/reset-password')
      )

      if (!user && !isPublic && !location.pathname.startsWith('/appointment/')) {
        navigate('/login')
      }
    }
  }, [user, loading, location.pathname, navigate])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='relative flex items-center justify-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-100 border-t-primary'></div>
          <div className='absolute text-[10px] font-bold text-primary animate-pulse'>MEDICO</div>
        </div>
      </div>
    )
  }

  const isAdminRoute = ['/dashboard', '/add-doctor', '/all-appointments', '/doctor-list', '/add-admin', '/doctor-profile', '/doctor-appointments'].some(path => location.pathname.startsWith(path))

  return (
    <>
      <AnimatedBackground />
      <div className='mx-4 sm:mx-[10%] relative z-10'>
        <Navbar />

        <AnimatePresence mode='wait'>
          {isAdminRoute ? (
            <div className='flex items-start' key="admin-layout">
              <Sidebar />
              <Routes location={location} key={location.pathname}>
                <Route path='/' element={<PageTransition><Home /></PageTransition>} />
                <Route path='/doctors' element={<PageTransition><Doctors /></PageTransition>} />
                <Route path='/doctors/:speciality' element={<PageTransition><Doctors /></PageTransition>} />
                <Route path='/login' element={<PageTransition><Login /></PageTransition>} />
                <Route path='/forgot-password' element={<PageTransition><ForgotPassword /></PageTransition>} />
                <Route path='/reset-password/:token' element={<PageTransition><ResetPassword /></PageTransition>} />
                <Route path='/about' element={<PageTransition><About /></PageTransition>} />
                <Route path='/contact' element={<PageTransition><Contact /></PageTransition>} />
                <Route path='/appointment/:docId' element={<PageTransition><Appointment /></PageTransition>} />
                <Route path='/my-appointments' element={<PageTransition><MyAppointments /></PageTransition>} />
                <Route path='/my-profile' element={<PageTransition><MyProfile /></PageTransition>} />
                <Route path='/dashboard' element={<PageTransition><Dashboard /></PageTransition>} />
                <Route path='/add-doctor' element={<PageTransition><AddDoctor /></PageTransition>} />
                <Route path='/doctor-list' element={<PageTransition><DoctorsList /></PageTransition>} />
                <Route path='/all-appointments' element={<PageTransition><AllAppointments /></PageTransition>} />
                <Route path='/add-admin' element={<PageTransition><AddAdmin /></PageTransition>} />
                <Route path='/doctor-profile' element={<PageTransition><DoctorProfile /></PageTransition>} />
                <Route path='/doctor-appointments' element={<PageTransition><DoctorAppointments /></PageTransition>} />
                <Route path='/reviews' element={<PageTransition><Reviews /></PageTransition>} />

              </Routes>
            </div>
          ) : (
            <Routes location={location} key={location.pathname}>
              <Route path='/' element={<PageTransition><Home /></PageTransition>} />
              <Route path='/doctors' element={<PageTransition><Doctors /></PageTransition>} />
              <Route path='/doctors/:speciality' element={<PageTransition><Doctors /></PageTransition>} />
              <Route path='/login' element={<PageTransition><Login /></PageTransition>} />
              <Route path='/forgot-password' element={<PageTransition><ForgotPassword /></PageTransition>} />
              <Route path='/reset-password/:token' element={<PageTransition><ResetPassword /></PageTransition>} />
              <Route path='/about' element={<PageTransition><About /></PageTransition>} />
              <Route path='/contact' element={<PageTransition><Contact /></PageTransition>} />
              <Route path='/appointment/:docId' element={<PageTransition><Appointment /></PageTransition>} />
              <Route path='/my-appointments' element={<PageTransition><MyAppointments /></PageTransition>} />
              <Route path='/my-profile' element={<PageTransition><MyProfile /></PageTransition>} />
              <Route path='/dashboard' element={<PageTransition><Dashboard /></PageTransition>} />
              <Route path='/add-doctor' element={<PageTransition><AddDoctor /></PageTransition>} />
              <Route path='/doctor-list' element={<PageTransition><DoctorsList /></PageTransition>} />
              <Route path='/all-appointments' element={<PageTransition><AllAppointments /></PageTransition>} />
              <Route path='/doctor-appointments' element={<PageTransition><DoctorAppointments /></PageTransition>} />
              <Route path='/reviews' element={<PageTransition><Reviews /></PageTransition>} />
            </Routes>
          )}
        </AnimatePresence>

        <Footer />
        <ChatBox />
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  )
}

export default App
