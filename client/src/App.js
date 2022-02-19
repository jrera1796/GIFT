import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonalityCheck from './pages/PersonailtyCheck'
import GiftsIdea from './pages/GiftsIdeas'
import Login from './pages/Login'

import 'bulma/css/bulma.css';

function App() {
	const [categories] = useState([
		{ name: 'Home' },
		{ name: 'PersonailtyCheck' },
		{ name: 'GiftsIdea' },
		{ name: 'LoginLogout' },
	]);

	const renderPage = () => {
		if (currentCategory.name === 'Home') {
			return <Home currentCategory={currentCategory} />;
		}
	};

	const [currentCategory, setCurrentCategory] = useState(categories[0]);
	return (
		<div>
			<Header
				categories={categories}
				setCurrentCategory={setCurrentCategory}
				currentCategory={currentCategory}
			></Header>
			<main className="container.is-fullhd">{renderPage()}</main>
			<Footer />
		</div>
	);
}

export default App;
