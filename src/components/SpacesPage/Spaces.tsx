import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchTransactions } from '../../api';
import { Transaction } from '../../types';
import Transactions from './Transactions';
import { Box, Grid2 as Grid } from '@mui/material';
import LineChart from '../Visualization/LineChart';
import { getLineChartData } from '../../utils';

const Spaces: React.FC = () => {
  const { spaceId } = useParams();
  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({ queryKey: ['fetchTransactions'], queryFn: () => fetchTransactions(spaceId || '') });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) {
    console.error("Error fetching transactions:", error);
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Transactions transactions={transactions || []} />
        </Grid>
        <Grid size={6}>
          <LineChart data={getLineChartData(transactions || [])} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Spaces;