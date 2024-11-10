import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import QueryClientProvider from './providers/QueryClientProvider';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
