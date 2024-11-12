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
    <Box sx={{ padding: 1 }}>
      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid size={10}>
          <Paper elevation={3} sx={{ paddingX: 3, paddingY: 1 }}>
            <Transactions transactions={transactions || []} />
          </Paper>
        </Grid>
        <Grid size={2}>
          {getKPIs().map((kpi, index) => (
            <Box sx={{ marginBottom: 4.5 }} key={index}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <KpiCard title={kpi.title} value={kpi.value} />
              </Paper>
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Transactions Table Section */}
      <Grid container spacing={3} sx={{ marginTop: 1 }}>
        <Grid size={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Category Breakdown</Typography>
            <PieChartComponent data={getPieChartData(transactions || [])} />
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Transactions Over Time</Typography>
            <LineChartComponent data={getLineChartData(transactions || [])} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
    // <Box>
    //   <Grid container justifyContent={'center'} spacing={1}>
    //     {
    //       getKPIs().map((kpi, index) => <Grid key={index} size={2}><KpiCard title={kpi.title} value={kpi.value} /></Grid>)
    //     }
    //     <Grid size={6}>
    //       <PieChartComponent data={getPieChartData(transactions || [])} />
    //     </Grid>
    //   </Grid>
    //   <Grid container spacing={2}>
    //     <Grid size={6}>
    //       <Transactions transactions={transactions || []} />
    //     </Grid>
    //     <Grid size={6}>
    //       <LineChartComponent data={getLineChartData(transactions || [])} />
    //     </Grid>
    //   </Grid>

    // </Box>
  )
}

export default Spaces;