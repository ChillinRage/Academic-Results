import React from 'react';
import ReactDOM from 'react-dom/client';
import './react-components/css/index.css'
import App from './react-components/tsx/App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);