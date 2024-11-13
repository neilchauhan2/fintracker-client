import { Box, Grid2 as Grid } from '@mui/material';
import React from 'react'
import logo from '../../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <Box height='50px' sx={{
      paddingX: 1
    }}>
      <Grid container spacing={2} justifyContent='space-between' alignItems='center'>
        <Grid>
          <Grid container justifyContent='center' spacing={1} component={Link} to={'/'} style={{ textDecoration: 'none' }}>
            <Grid>
              <img src={logo} alt="logo" height='30px' width='30px' />
            </Grid>
            <Grid>
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: "#1D1D1F" }}>FinTracker</span>
            </Grid>
          </Grid>
        </Grid>
        {location.pathname === '/' && <Grid>
          <Link to={'/spaces'} style={{ textDecoration: 'none', color: '#5C5C5E' }}>
            <span>
              Get Started
            </span>
          </Link>
        </Grid>}
      </Grid>
    </Box>
  )
}

export default Navbar;