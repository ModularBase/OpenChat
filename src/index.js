import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
