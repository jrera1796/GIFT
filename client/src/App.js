//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PersonalityTest from './pages/PersonalityTest';
import SearchPage from './pages/SearchPage';

import 'bulma/css/bulma.css';

const httpLink = createHttpLink({ uri: '/graphql' }); //graphQL endpoint

const authLink = setContext((_, { headers }) => {
	//middleware to JWTtoken per/req - authorization header
	const token = localStorage.getItem('id_token'); //get auth token from localStorage
	return {
		//return headers to context for httpLink to read
		headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
	};
});

const client = new ApolloClient({
	//client to execute authLink middleware per/req to GraphQL
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				
					<Header />
					
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/dashboard" component={Dashboard} />
							<Route exact path="/login" component={Login} />
							{/* <Route exact path="/signup" component={Signup} /> */}
							<Route exact path="/search" component={SearchPage} />
							<Route exact path="/test"component={PersonalityTest}
							/>
						</Switch>
				
					
				
				<Footer />
			</Router>
		</ApolloProvider>
	);
}

export default App;
