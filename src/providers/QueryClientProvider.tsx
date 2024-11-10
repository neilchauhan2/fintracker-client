import React from 'react';
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
