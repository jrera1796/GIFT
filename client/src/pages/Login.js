import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';


export default function Login() {
	const [toggle, setToggle] = useState()
  return (
	<div>
		{toggle?(

		<div className='box'><button className='is-button' onClick={() => setToggle(false)}>SignUp</button><LoginForm /></div>) 
		:(
			<div className='box'><button className='is-button' onClick={() => setToggle(true)}>Login</button><SignupForm/></div>
		)
		}
	</div>

  )
}
