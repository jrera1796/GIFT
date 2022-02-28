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
				<a className="active" href="/">
					{' '}
				</a>
				{Auth.loggedIn() ? (
					<>
            <div className="nav-options has-text-weight-bold">
              <Link to="/dashboard" className="ml-3 mr-3">Dashboard</Link>

              <a href="/" onClick={logout} className="ml-3 mr-3">
                Logout
              </a>
              <a href="/search" className="ml-3 mr-3">GiftSearch</a>
            </div>
					</>
				) : (
					<>
						<div className="nav-options has-text-weight-bold">
							<Link to="/search" className="ml-3 mr-3">
								GiftSearch
							</Link>
							<Link to="/test" className="ml-3 mr-3">
								Personality Test
							</Link>
							<Link to="/login" className="ml-3 mr-3">
								Login
							</Link>
							<Link to="/signup" className="ml-3 mr-3">
								Signup
							</Link>
						</div>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
