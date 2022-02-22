import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonailtyTest from './pages/PersonalityTest';
import GiftsIdea from './pages/GiftsIdeas';
import Login from './pages/Login';

import 'bulma/css/bulma.css';

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
