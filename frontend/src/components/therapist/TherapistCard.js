import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Typography, 
  Button 
} from '@mui/material';

export const TherapistCard = ({ therapist, onRequestSession }) => {
  return (
    <Card className="therapist-card">
      <CardHeader
        avatar={
          <Avatar 
            src={therapist.profileImage} 
            alt={therapist.name}
          />
        }
        title={therapist.name}
        subheader={therapist.expertise.join(', ')}
      />
      <CardContent>
        <Typography variant="body2">
          {therapist.bio}
        </Typography>
        <div className="therapist-actions">
          <Typography 
            variant="caption" 
            color={therapist.availability.online ? 'success' : 'error'}
          >
            {therapist.availability.online ? 'Online' : 'Offline'}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            disabled={!therapist.availability.online}
            onClick={() => onRequestSession(therapist)}
          >
            Request Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};