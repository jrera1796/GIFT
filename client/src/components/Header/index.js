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
        <a className="active" href="/"> GIFT</a>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
             
              <a href="/" onClick={logout}>
                Logout
              </a>
              <a href="/search">GiftSearch</a>
            </>
          ) : (
            <>
              <Link to="/login">Login/Signup</Link>
              <Link to="/search">GiftSearch</Link>
            </>
          )}
        </nav>
    </header>
  );
};

export default Header;
