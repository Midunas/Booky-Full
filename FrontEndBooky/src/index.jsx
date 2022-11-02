
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
// import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ""
      }
    })
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode >

)

