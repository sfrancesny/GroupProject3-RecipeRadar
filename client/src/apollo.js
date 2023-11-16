// src/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'; 

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem('authToken');
  // Log the token being used for the request
  console.log('Auth Token:', authToken);
  return {
    headers: {
      ...headers,
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
});

// Middleware for logging outgoing requests
const requestLogger = new ApolloLink((operation, forward) => {
  console.log(`[Request]: ${operation.operationName}`, operation);
  return forward(operation).map((response) => {
    // Log the response from the server
    console.log(`[Response]: ${operation.operationName}`, response);
    return response;
  });
});

// Afterware for logging errors
const errorLogger = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors) {
      // Log any errors returned by the server
      console.error(`[GraphQL Error]: ${operation.operationName}`, response.errors);
    }
    return response;
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, requestLogger, errorLogger, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;

