//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import Navbar from './components/Navbar';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: '/graphql' }); //graphQL endpoint

const authLink = setContext((_, { headers }) => { //middleware to JWTtoken per/req - authorization header
  const token = localStorage.getItem('id_token'); //get auth token from localStorage 
  return { //return headers to context for httpLink to read
    headers: { ...headers, authorization: token ? `Bearer ${token}` : '' }
  };
});

const client = new ApolloClient({ //client to execute authLink middleware per/req to GraphQL
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            {/* <Route exact path="/" component={Gift} />
            <Route exact path="/Dashboard" component={SavedGifts} /> */}
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
