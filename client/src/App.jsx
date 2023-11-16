// client/src/App.jsx
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import Main from './main.jsx';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
