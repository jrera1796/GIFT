import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
	const logout = event => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		
		<header>
			<nav className="topnav">
				<a className="active" href="/"> GIFT
					{' '}
				</a>
				{Auth.loggedIn() ? (
					<>
						<div className="nav-options has-text-weight-bold">
							<Link to="/test" className="ml-3 mr-3">Personality Test</Link>
							<Link to="/dashboard" className="ml-3 mr-3">Dashboard</Link>
							<Link to="/search" className="ml-3 mr-3">GiftSearch</Link>
							<a href="/" onClick={logout} className="ml-3 mr-3">Logout</a>
						</div>
					</>
				) : (
					<>
						<div className="nav-options has-text-weight-bold">
							<Link to="/search" className="ml-3 mr-3">GiftSearch</Link>
							<Link to="/login" className="ml-3 mr-3">Login/Signup</Link>


							
						</div>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
