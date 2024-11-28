import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/shared/Layout'
import RegisterForm from './components/auth/RegisterForm'
import LoginForm from './components/auth/LoginForm'
function App() {
  return (
    <Router>
    <AdminDashboard/>
    {/* <TherapistBrowse/> */}
      <LoginForm />
      <RegisterForm />
      <Layout />
      <AdminDashboard />
    </Router>
  )
}

export default App