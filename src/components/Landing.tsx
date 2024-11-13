import React from 'react';
import { Button, Typography, Box, Grid2 as Grid } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import landing from '../assets/landing.png';
import blob from '../../public/blob.svg';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/blob.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: { xs: '1rem', sm: '2rem', md: '3rem' },
        overflow: 'hidden',
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 2 }}
        justifyContent="center"
        direction={{ xs: 'column-reverse', md: 'row' }}
      >
        {/* Text Content */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', md: 'flex-start' },
              height: '100%',
              textAlign: { xs: 'center', md: 'left' },
              padding: { xs: '1rem', sm: '2rem', md: '3rem' },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: '1.25rem',
                  sm: '1.5rem',
                  md: '2.5rem'
                },
                fontWeight: 700,
                mb: { xs: 2, md: 4 },
                color: '#1D1D1F',
                lineHeight: 1.2,
              }}
            >
              FinTracker App
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1rem',
                  md: '1.5rem'
                },
                mb: { xs: 3, md: 4 },
                color: '#3A3A3C',
                maxWidth: '800px',
                lineHeight: 1.5,
              }}
            >
              Take control of your finances with our simple, secure, and intuitive tracking tool.
              No sign-up required - just click start and begin managing your money.
            </Typography>

            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              sx={{
                background: '#007DFC',
                color: 'white',
                padding: '0.5rem 0.75rem',
                fontSize: '1rem',
                '&:hover': {
                  background: '#0056B3',
                },
                transition: 'all 0.3s ease',
                borderRadius: '8px',
                textTransform: 'none',
              }}
              onClick={() => navigate('/spaces')}
            >
              Get Started
            </Button>
          </Box>
        </Grid>

        {/* Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: { xs: '1rem', sm: '2rem' },
            }}
          >
            <img
              src={landing}
              alt="landing"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: isTablet ? 'none' : '0 4px 24px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;