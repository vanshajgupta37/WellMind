import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button,
  Chip,
  Stack,
  Container,
  Slider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAuth } from '../../context/AuthContext';
// import TherapistDetailModal from './therapist/TherapistDetailModal';

const TherapistBrowse = () => {
  const { user } = useAuth();
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState([20, 200]);
  const [languageFilter, setLanguageFilter] = useState('');

  // Modal state
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Predefined filter options
  const specialties = [
    'Depression', 'Anxiety', 'Relationship', 
    'Family Counseling', 'Stress Management', 
    'Career Counseling', 'PTSD', 'Addiction'
  ];

  const languages = [
    'English', 'Spanish', 'French', 
    'Mandarin', 'Arabic', 'Hindi'
  ];

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await fetch('/api/therapists', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch therapists');
        }

        const data = await response.json();
        setTherapists(data);
        setFilteredTherapists(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTherapists();
  }, [user.token]);

  useEffect(() => {
    // Apply filters
    let result = therapists.filter(therapist => 
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specialtyFilter ? therapist.specialties.includes(specialtyFilter) : true) &&
      (therapist.sessionPrice >= priceRangeFilter[0] && 
       therapist.sessionPrice <= priceRangeFilter[1]) &&
      (languageFilter ? therapist.languages.includes(languageFilter) : true)
    );

    setFilteredTherapists(result);
  }, [searchTerm, specialtyFilter, priceRangeFilter, languageFilter, therapists]);

  const handleOpenDetailModal = (therapist) => {
    setSelectedTherapist(therapist);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedTherapist(null);
    setIsDetailModalOpen(false);
  };

  const handleSendRequest = (therapist) => {
    // Implement chat request logic
    console.log('Sending chat request to', therapist.name);
  };

  const renderFilters = () => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2, 
      mb: 3,
      p: 2,
      border: '1px solid #e0e0e0',
      borderRadius: 2
    }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search Therapists"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon />
        }}
      />

      <FormControl fullWidth>
        <InputLabel>Specialty</InputLabel>
        <Select
          value={specialtyFilter}
          label="Specialty"
          onChange={(e) => setSpecialtyFilter(e.target.value)}
        >
          <MenuItem value="">All Specialties</MenuItem>
          {specialties.map(specialty => (
            <MenuItem key={specialty} value={specialty}>
              {specialty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ px: 2 }}>
        <Typography gutterBottom>Session Price Range</Typography>
        <Slider
          value={priceRangeFilter}
          onChange={(e, newValue) => setPriceRangeFilter(newValue)}
          valueLabelDisplay="auto"
          min={20}
          max={200}
        />
      </Box>

      <FormControl fullWidth>
        <InputLabel>Language</InputLabel>
        <Select
          value={languageFilter}
          label="Language"
          onChange={(e) => setLanguageFilter(e.target.value)}
        >
          <MenuItem value="">All Languages</MenuItem>
          {languages.map(language => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const renderTherapistCard = (therapist) => (
    <Card key={therapist.id} sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%' 
    }}>
      <CardMedia
        component="img"
        height="200"
        image={therapist.profileImage || '/default-avatar.png'}
        alt={therapist.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{therapist.name}</Typography>
        <Stack direction="row" spacing={1} sx={{ my: 1 }}>
          {therapist.specialties.slice(0, 2).map(specialty => (
            <Chip 
              key={specialty} 
              label={specialty} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          ${therapist.sessionPrice}/session | {therapist.languages.join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleOpenDetailModal(therapist)}
        >
          View Details
        </Button>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => handleSendRequest(therapist)}
        >
          Send Request
        </Button>
      </CardActions>
    </Card>
  );

  if (loading) return <Typography>Loading therapists...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Find Your Perfect Therapist
        </Typography>

        {renderFilters()}

        <Grid container spacing={3}>
          {filteredTherapists.length > 0 ? (
            filteredTherapists.map(therapist => (
              <Grid item xs={12} sm={6} md={4} key={therapist.id}>
                {renderTherapistCard(therapist)}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography>No therapists match your current filters.</Typography>
            </Grid>
          )}
        </Grid>

        {selectedTherapist && (
          <TherapistDetailModal
            open={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            therapist={selectedTherapist}
            onSendRequest={handleSendRequest}
          />
        )}
      </Box>
    </Container>
  );
};

export default TherapistBrowse;