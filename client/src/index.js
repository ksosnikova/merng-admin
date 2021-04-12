import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { cache } from './cache';
import { setContext } from 'apollo-link-context';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  gql
} from '@apollo/client';
import { AUTH_TOKEN } from './constatns';
import './index.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:8005/graphql'
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}` || '',
    },
  };
});

//local typedefs
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    isAdmin: Boolean!
  }
`;

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  //cache: new InMemoryCache(),
  typeDefs,
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);


