import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
function Header(props) {
	const { categories = [], setCurrentCategory, currentCategory } = props;

	useEffect(() => {
		document.title = currentCategory.name;
	}, [currentCategory]);
	
	const logout = event => {
		event.preventDefault();
		Auth.logout();
	  };
	return (
		<header>
			<nav className="topnav">
				<a className="active navbar-item" href="#gift">
					GIFT
				</a>
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
				{Auth.loggedIn() ? (
					<>
						<Link to="/profile">Me</Link>
						<a href="/" onClick={logout}>
							Logout
						</a>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</>
				)}
			</nav>
		</header>
	);
}

export default Header;
