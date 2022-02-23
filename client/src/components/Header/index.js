import React, { useEffect, useState } from 'react';

function Header(props) {
	const { categories = [], setCurrentCategory, currentCategory } = props;

	useEffect(() => {
		document.title = currentCategory.name;
	}, [currentCategory]);

	return (
		<header>
			<nav className="topnav">
        <a className="active navbar-item" href="#gift">GIFT</a>
				<ul>
					{categories.map(category => (
						<li
							className={`navbar-item ${
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
		</header>
	);
}

export default Header;
