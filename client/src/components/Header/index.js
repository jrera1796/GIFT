import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import GiftLogo from '../../assets/svg/Gift.svg'
const Header = () => {
	const logout = event => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		
		<header>
			<nav className="topnav is-flex-direction-column">
				<a className="active has-text-centered has-text-weight-bold is-size-4 gift-nav-bar" href="/">
				<img src={GiftLogo} alt="GIFT" />
				</a>
				{Auth.loggedIn() ? (
					<>
						<div className="nav-options has-text-weight-bold level-right">
							<Link to="/dashboard" className="has-text-white ml-3 mr-3">Dashboard</Link>
							<Link to="/search" className=" has-text-white ml-3 mr-3">GiftSearch</Link>
							<a href="/" onClick={logout} className="has-text-white ml-3 mr-3">Logout</a>
						</div>
					</>
				) : (
					<>
						<div className="nav-options has-text-weight-bold level-right">
							<Link to="/search" className="has-text-white ml-3 mr-3">GiftSearch</Link>
							<Link to="/login" className="has-text-white ml-3 mr-3">Login/Signup</Link>


							
						</div>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
