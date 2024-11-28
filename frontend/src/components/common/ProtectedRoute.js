import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Container 
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Container maxWidth="xs">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh' 
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Container maxWidth="xs">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh' 
          }}
        >
          <Typography variant="h5" color="error">
            Unauthorized Access
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            You do not have permission to access this page.
          </Typography>
        </Box>
      </Container>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;