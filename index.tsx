import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { SeniorThemeProvider } from './src/components/siteplan/SeniorThemeProvider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Single QueryClient instance for the entire app
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SeniorThemeProvider>
        <App />
      </SeniorThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);