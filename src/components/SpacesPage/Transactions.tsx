import React, { useState } from 'react'
import { Transaction } from '../../types'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Grid2, Typography } from '@mui/material';
import TransactionModal from './TransactionModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '../../api';
import { useParams } from 'react-router-dom';

type TransactionsProps = {
  transactions: Transaction[]
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const { spaceId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: removeTransaction, isPending: isDeletePending, error: deleteError } = useMutation({
    mutationFn: (id: string) => deleteTransaction(spaceId || '', id),
    onSuccess: (data) => {
      console.log("Transaction updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ['fetchTransactions'] });
    },
    onError: (error) => {
      console.error("Error creating space:", error);
    }
  });



  const columns: GridColDef[] = [
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
    { field: 'category', headerName: 'Category', width: 200 },
    {
      field: 'date', headerName: 'Date', width: 180, type: 'dateTime',
      valueFormatter: (value) => dayjs(value).format('DD/MM/YYYY'),
      editable: true,
    },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await removeTransaction(id);
  };

  const handleAddTransaction = async () => {
    setModalOpen(true);
    setSelectedTransaction(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTransaction(null);
  };

  if (isDeletePending) {
    return <div>Deleting...</div>
  }

  if (deleteError) {
    console.error("Error deleting transaction:", deleteError);
  }

  return (
    <Box width='100%' height='100%'>
      <Grid2 justifyContent='space-between' container>
        <Grid2>
          <Typography variant="h6" gutterBottom>Transactions</Typography>
        </Grid2>
        <Grid2>
          <Button variant="contained" color="primary"
            onClick={handleAddTransaction}
            style={{ marginBottom: '1rem' }}>
            Add Transaction
          </Button>
        </Grid2>
      </Grid2>
      <DataGrid
        rows={transactions}
        columns={columns}
        editMode='row'
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[4]}
        getRowId={(row) => row.id}
      />
      <TransactionModal
        open={modalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </Box>
  );
};


export default Transactions