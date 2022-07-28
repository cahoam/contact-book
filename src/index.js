import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactContextProvider from './Context/ContactContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContactContextProvider>
      <App />
    </ContactContextProvider>
  </React.StrictMode>
);