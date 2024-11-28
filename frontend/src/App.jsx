import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/shared/Layout'
import RegisterForm from './components/auth/RegisterForm'
import LoginForm from './components/auth/LoginForm'
import AdminDashboard from './components/admin/AdminDashboard'
function App() {
  return (
    <Router>
      <LoginForm />
      <RegisterForm />
      <Layout />
      <AdminDashboard />
    </Router>
  )
}

export default App