import React, { useContext } from 'react'
import Login from './pages/Login'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddTherapist from './pages/Admin/AddTherapist';
import TherapistList from './pages/Admin/TherapistList';


const App = () => {
  const {token} = useContext(AdminContext)

  return token ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>

        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />}/>
          <Route path = 'all-appointments' element={<AllAppointments />} />
          <Route path='add-therapist' element={<AddTherapist />} />
          <Route path='/therapist-list' element={<TherapistList />} />
        </Routes>
      </div>
    </div>
  ):(
    <div>
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App