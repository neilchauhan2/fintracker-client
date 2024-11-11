import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchTransactions } from '../../api';
import { Transaction } from '../../types';
import Transactions from './Transactions';

const Spaces: React.FC = () => {
  const { spaceId } = useParams();
  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({ queryKey: ['fetchTransactions'], queryFn: () => fetchTransactions(spaceId || '') });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) {
    console.error("Error fetching transactions:", error);
  }

  return (
    <div>
      <Transactions transactions={transactions || []} />
    </div>
  )
}

export default Spaces;