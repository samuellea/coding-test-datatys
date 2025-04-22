import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Toaster } from 'react-hot-toast';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
  // eslint-disable-next-line comma-dangle
  document.getElementById('root')
);
