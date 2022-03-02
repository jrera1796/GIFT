import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

export default function Login() {
  return (
	<div>
		<LoginForm />
		<SignupForm />
	</div>

  )
}
