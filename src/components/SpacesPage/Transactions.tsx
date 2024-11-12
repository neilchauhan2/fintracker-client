import React, { useState } from 'react'
import { Transaction } from '../../types'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
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
    { field: 'id', headerName: 'ID', width: 100 },
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
    <Container style={{ height: '50%', width: '100%', marginTop: '2rem' }}>
      <Button variant="contained" color="primary"
        onClick={handleAddTransaction}
        style={{ marginBottom: '1rem' }}>
        Add Transaction
      </Button>
      <DataGrid
        rows={transactions}
        columns={columns}
        editMode='row'
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        getRowId={(row) => row.id}
      />
      <TransactionModal
        open={modalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </Container>
  );
};


export default Transactions