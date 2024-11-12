import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

type KpiCardProps = {
  title: string;
  value: number;
};

const KpiCard: React.FC<KpiCardProps> = ({ title, value }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Typography
        variant={isSmallScreen ? 'body2' : 'body1'}
        sx={{
          fontWeight: 500,
          color: theme.palette.text.primary,
          marginBottom: '0.8rem',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant={isSmallScreen ? 'h6' : 'h5'}
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
        }}
      >
        {value.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default KpiCard;