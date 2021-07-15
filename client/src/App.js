import React, { Component } from 'react';
import './App.css';
import Launches from './components/Launches';
import Launch from './components/Launch';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import logo from './logo.png'
// npm install @apollo/client graphql - do it on client folder 
// Deprecated
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo'; 
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
        <Router>
          <div className="container">
            <img 
              src= {logo} 
              alt="SpaceX" 
              style={{width:300 , display: 'block', margin: 'auto'}} 
            />
              <Launches />
              <Route exact path="/" componenet={Launches} />
              <Route exact path="/launch/:fight_number" componenet={Launch} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
