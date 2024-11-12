import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Transaction } from '../../types';
import dayjs from 'dayjs';
import { createTransaction, updateTransaction } from '../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ open, onClose, transaction }) => {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [description, setDescription] = useState('');
  const { spaceId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: addTransaction, isPending, error } = useMutation({
    mutationFn: () => createTransaction(
      spaceId || '',
      {
        description,
        amount,
        date,
        type,
        category
      }
    ),
    onSuccess: (data) => {
      console.log("Transaction created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ['fetchTransactions'] });
    },
    onError: (error) => {
      console.error("Error creating Transaction:", error);
    }
  });
  const { mutate: editTransaction, isPending: isUpdatePending, error: updateError } = useMutation({
    mutationFn: () => updateTransaction(
      spaceId || '',
      transaction?.id || '',
      {
        description,
        amount,
        date,
        type,
        category
      }
    ),
    onSuccess: (data) => {
      console.log("Transaction updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ['fetchTransactions'] });
    },
    onError: (error) => {
      console.error("Error creating Transaction:", error);
    }
  });


  useEffect(() => {
    if (transaction) {
      setType(transaction.type || '');
      setAmount(transaction.amount || null);
      setCategory(transaction.category || '');
      setDate(transaction.date || dayjs(new Date()).format('YYYY-MM-DD'));
      setDescription(transaction.description || '');
    } else {
      clearFields();
    }
  }, [transaction]);

  const clearFields = () => {
    setType('');
    setAmount(null);
    setCategory('');
    setDescription('');
  };

  const handleSave = async () => {
    if (transaction?.id) {
      await editTransaction();
    } else {
      await addTransaction();
    }
    onClose();
  };

  if (isPending || isUpdatePending) return <p>Saving transaction...</p>;
  if (error) {
    console.error("Error saving transaction:", error);
  }
  if (updateError) {
    console.error("Error saving transaction:", updateError);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          {transaction ? 'Edit Transaction' : 'Add Transaction'}
        </Typography>
        <TextField
          label="Type"
          fullWidth
          margin="normal"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          label="Amount"
          fullWidth
          margin="normal"
          type="number"
          value={amount ? amount : ''}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          margin="normal"
          type="date"
          value={dayjs(date).format('YYYY-MM-DD')}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSave}>
            {transaction ? 'Update' : 'Add'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
