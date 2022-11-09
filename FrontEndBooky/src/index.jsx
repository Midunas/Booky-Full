import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
//TODO: return Strict.Mode

root.render(

  <ChakraProvider>
    <App />
  </ChakraProvider>

)