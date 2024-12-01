import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/pages/Layout'
import RegisterForm from './components/pages/RegisterForm'
import LoginForm from './components/pages/LoginForm'
import AdminDashboard from './components/admin/AdminDashboard'
import TherapistPage from './components/pages/TherapistPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/therapistpage" element={<TherapistPage />} />
        <Route path="/*" element={<Layout />} />
        
      </Routes>
    </Router>
  )
}

export default App