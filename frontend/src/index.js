import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    cancel: {
      main: '#dc004e',
      color: '#fff'
    },
    purple: {
      main: '#9c27b0',
    },
    cyan: {
      main: '#e91e63',
    },
    deepOrange: {
      main: '#ff5722',
    },
    pink: {
      main: '#f50057',
    },
    brown: {
      main: '#795548',
    },
    yellow: {
      main: '#ffeb3b',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
      {/* <BrowserRouter future={{ v7_relativeSplatPath: true }}> */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
