import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchTransactions } from '../../api';
import { Transaction } from '../../types';
import Transactions from './Transactions';
import { Box, Grid2 as Grid, Paper, Typography } from '@mui/material';
import LineChartComponent from '../Visualization/LineChartComponent';
import { getLineChartData, getPieChartData, getTotalExpenses, getTotalIncome, getTotalTransactions } from '../../utils';
import PieChartComponent from '../Visualization/PieChartComponent';
import KpiCard from '../Visualization/KpiCard';

const Spaces: React.FC = () => {
  const { spaceId } = useParams();
  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({ queryKey: ['fetchTransactions'], queryFn: () => fetchTransactions(spaceId || '') });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) {
    console.error("Error fetching transactions:", error);
  }

  const getKPIs = () => {
    return [{
      title: 'Total Transactions',
      value: getTotalTransactions(transactions || [])
    }, {
      title: 'Total Income',
      value: getTotalIncome(transactions || [])
    }, {
      title: 'Total Expenses',
      value: getTotalExpenses(transactions || [])
    }]
  };

  return (
    <Box sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 10 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Transactions transactions={transactions || []} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2 }}>
          {getKPIs().map((kpi, index) => (
            <Box sx={{ marginBottom: { xs: 2, sm: 3, md: 4 } }} key={index}>
              <Paper elevation={3} sx={{ padding: { xs: 1, sm: 2, md: 3 }, textAlign: 'center' }}>
                <KpiCard title={kpi.title} value={kpi.value} />
              </Paper>
            </Box>
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Category Breakdown</Typography>
            <PieChartComponent data={getPieChartData(transactions || [])} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Transactions Over Time</Typography>
            <LineChartComponent data={getLineChartData(transactions || [])} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Spaces;