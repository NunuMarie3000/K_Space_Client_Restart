import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Top from './Top';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import axios from 'axios';  // Add this import

// Add the axios interceptor before the app renders
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <BrowserRouter>
          <Top />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
