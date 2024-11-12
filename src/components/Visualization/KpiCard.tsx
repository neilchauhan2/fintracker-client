import { Box } from '@mui/material';
import React from 'react'

type KpiCardProps = {
  title: string;
  value: number;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
}) => {
  return (
    <Box style={{
      width: '100%',
      height: '100%',
    }}>
      <span style={{
        fontSize: '1rem',
        display: 'block',
        fontWeight: 500,
        color: '#333',
      }}>{title}</span>
      <span style={{
        fontSize: '2rem',
        fontWeight: 600,
        display: 'block',
      }}>{value}</span>
    </Box>
  )
}

export default KpiCard