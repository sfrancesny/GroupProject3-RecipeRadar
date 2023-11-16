import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import { reducer } from '../utils/reducers';

// Create a Redux store using configureStore
const store = configureStore({ reducer });

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Wrap App component with Redux Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
