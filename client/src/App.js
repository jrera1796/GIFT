//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';

import 'bulma/css/bulma.css';

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
		  <div className="flex-column justify-flex-start min-100-vh">
			<Header />
			<div className="container">
			  <Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route component={NoMatch} />
			  </Switch>
			</div>
			<Footer />
		  </div>
		</Router>
	  </ApolloProvider>
	);
}

export default App


// return (
//     <ApolloProvider client={client}>
//       <Router>
//         <>
//           <Navbar />
//           <Switch>
//             {/* <Route exact path="/" component={Gift} />
//             <Route exact path="/Dashboard" component={SavedGifts} /> */}
//             <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
//           </Switch>
//         </>
//       </Router>
//     </ApolloProvider>
//   );
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
