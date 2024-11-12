import React from 'react';
import { Button, Typography, Box, Grid2 as Grid } from '@mui/material';
import landing from '../assets/landing.png';
import blob from '../assets/blob.svg';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        marginTop: '2rem',
        height: '100vh',
        backgroundImage: `url(${blob})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid size={6}>
          <Grid container justifyContent="center" alignItems="center" flexDirection={'column'} width={'100%'} height={'100%'} padding={3}>
            <Grid size={12}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.75rem' },
                  fontWeight: 700,
                  mb: 4,
                  color: '#1D1D1F'
                }}
              >
                FinTracker App
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: '#3A3A3C',
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                Take control of your finances with our simple, secure, and intuitive tracking tool.
                No sign-up required - just click start and begin managing your money.
              </Typography>
            </Grid>
            <Grid size={12}>
              <Button
                variant="contained"
                sx={{
                  background: '#007DFC',
                  color: 'white',
                }}
                onClick={() => navigate('/spaces')}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6} padding={2}>
          <img
            src={landing}
            alt="landing"
            style={{
              objectFit: 'cover',
              width: '100%',
              marginTop: '2rem',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
