import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	const { categories = [], setCurrentCategory, currentCategory } = props;

	useEffect(() => {
		document.title = currentCategory.name;
	}, [currentCategory]);
	return (
		<header>
			<div>
				<Link to="/">
					<h1>G.I.F.T</h1>
				</Link>
				<nav className="text-center">
					<ul className="flex-row">
						{categories.map(category => (
							<li
								className={`mx-2 ${
									currentCategory.name === category.name && 'navActive'
								}`}
								key={category.name}
							>
								<span
									onClick={() => {
										setCurrentCategory(category);
									}}
								>
									{category.name}
								</span>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
