//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonailtyTest from './pages/PersonalityTest';
import GiftsIdea from './pages/GiftsIdeas';
import Login from './pages/Login';
import { Link } from 'react-router-dom';
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
	const [categories] = useState([
		{ name: 'Home' },
		{ name: 'Personailty Test' },
		{ name: 'Gifts Idea' },
		{ name: 'Login' },
	]);

	const renderPage = () => {
		if (currentCategory.name === 'Home') {
			return <Home currentCategory={currentCategory} />;
		}
		if (currentCategory.name === 'Personailty Test') {
			return <PersonailtyTest currentCategory={currentCategory} />;
		}
		if (currentCategory.name === 'Gifts Idea') {
			return <GiftsIdea currentCategory={currentCategory} />;
		}
		if (currentCategory.name === 'Login') {
			return <Login currentCategory={currentCategory} />;
		}
	};

	const [currentCategory, setCurrentCategory] = useState(categories[0]);
	return (
		<ApolloProvider client={client}>
      <Router>
        <>
			<Header

				categories={categories}
				setCurrentCategory={setCurrentCategory}
				currentCategory={currentCategory}
			></Header>
			<main className="container.is-fullhd">{renderPage()}</main>
			<Footer />
      </>
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
