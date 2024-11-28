import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/shared/Layout'
import RegisterForm from './components/auth/RegisterForm'
import LoginForm from './components/auth/LoginForm'
import AdminDashboard from './components/admin/AdminDashboard'
// import TherapistBrowse from './components/client/TherapistSearch'


function App() {
  return (
    <Router>
    <AdminDashboard/>
    {/* <TherapistBrowse/> */}
      <LoginForm />
      <RegisterForm />
      <Layout />
    </Router>
  )
}

export default App