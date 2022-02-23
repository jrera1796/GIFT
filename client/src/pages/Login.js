import React, { useState } from 'react';

import SignUpForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
	<div>
		<LoginForm/>
		<SignUpForm/>
	</div>

  )
}
