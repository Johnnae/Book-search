import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar'; 
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// Create an Apollo Client
const client = new ApolloClient({
  uri: '/graphql', 
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary"> 
        <Navbar /> 
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
