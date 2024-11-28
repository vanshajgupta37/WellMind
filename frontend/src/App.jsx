import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';

// Dashboard Imports
import AdminDashboard from './components/admin/AdminDashboard';
import TherapistDashboard from './components/therapist/TherapistDashboard';
import ClientDashboard from './components/client/ClientDashboard';

// Utility Pages
import NotFoundPage from './pages/NotFound';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customizable primary color
    },
    secondary: {
      main: '#dc004e', // Customizable secondary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route 
              element={<ProtectedRoute allowedRoles={['Admin']} />}
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route 
              element={<ProtectedRoute allowedRoles={['Therapist']} />}
            >
              <Route path="/therapist/dashboard" element={<TherapistDashboard />} />
            </Route>

            <Route 
              element={<ProtectedRoute allowedRoles={['Client']} />}
            >
              <Route path="/client/dashboard" element={<ClientDashboard />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;