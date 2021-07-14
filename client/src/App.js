import React, { Component } from 'react';
import './App.css';
import Launches from './components/Launches'
// Deprecated
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo'; 
import logo from './logo.png'
// npm install @apollo/client graphql - do it on client folder 
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  // our server
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <img 
            src= {logo} 
            alt="SpaceX" 
            style={{width:300 , display: 'block', margin: 'auto'}} />
            <Launches />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
