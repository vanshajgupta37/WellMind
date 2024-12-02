import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/pages/Layout'
import RegisterForm from './components/pages/RegisterForm'
import LoginForm from './components/pages/LoginForm'
import AdminDashboard from './components/admin/AdminDashboard'
import TherapistPage from './components/pages/TherapistPage'
import FindTherapist from './components/pages/FindTherapist'
import MySessions from './components/pages/MySessions'
import Settings from './components/pages/Settings'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/therapistpage" element={<TherapistPage />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="findtherapist" element={<FindTherapist />} />
          <Route path="mysessions" element={<MySessions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App