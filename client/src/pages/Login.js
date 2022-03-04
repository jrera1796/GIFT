import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';


export default function Login() {
	const [toggle, setToggle] = useState()
  return (
	<div className='columns mt-3 is-full is-centered'>
		{toggle?(

		<div className='box has-background-dark is-full'><h1 className='has-text-white'>Log In Below! Don't have account yet? Click Here!</h1><button className='is-button' onClick={() => setToggle(false)}>SignUp</button><LoginForm /></div>) 
		:(
			<div className='box has-background-dark is-full'><h1 className='has-text-white'>Sign Up Below! Already have an account? Click here!</h1><button className='is-button' onClick={() => setToggle(true)}>Login</button><SignupForm/></div>
		)
		}
	</div>

  )
}
