import React from 'react'
import { Transaction } from '../../types'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Container } from '@mui/material';

type TransactionsProps = {
  transactions: Transaction[]
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
    { field: 'category', headerName: 'Category', width: 200 },
    {
      field: 'date', headerName: 'Date', width: 180, type: 'dateTime',
      valueFormatter: (value) => dayjs(value).format('YYYY/MM/DD'),
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

  // CRUD operations
  const handleEdit = (transaction: Transaction) => {
    console.log("Edit transaction:", transaction);
  };

  const handleDelete = async (id: string) => {
    console.log(id)
  };

  const handleAddTransaction = async () => {
    console.log('Add Transaction')
  };

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
    </Container>
  );
};


export default Transactions