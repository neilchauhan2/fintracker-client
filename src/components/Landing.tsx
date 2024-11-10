import React from 'react';
import { Button, Typography, Container } from '@mui/material';

const LandingPage: React.FC = () => {

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Finance Tracker</Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Container>
  );
};

export default LandingPage;
