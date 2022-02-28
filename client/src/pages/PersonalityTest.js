import React, { useState } from 'react';

import { Form, Button, Alert } from 'react-bootstrap';

import 'bulma/css/bulma.css';


export default function PersonalityTest() {
	
	const [userFormData, setUserFormData] = useState({
		traitOne: '', traitTwo: '', traitThree: '', traiFour: ''
	}); //init state form
	const [validated] = useState(false); //validate state form
	const [showAlert, setShowAlert] = useState(false); //alert for state form

	// useEffect(() => {
	// 	if (error) { setShowAlert(true); }
	// 	else { setShowAlert(false); }
	// }, [error])

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget; //check form (as per react-bootstrap docs)
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
	}


	const [traitOne, setTraitOne] = useState('');
	const [traitTwo, setTraitTwo] = useState('');
	const [traitThree, setTraitThree] = useState('');
	const [traitFour, setTraitFour] = useState('');

	function testResult(e)
	{
		e.preventDefault()
		console.warn("all data", traitOne, traitTwo, traitThree, traitFour)
	}



	return (
		<>
			<h1>Your Personality Test</h1>
			<form onSubmit={testResult}>
				<p>Is your recipient introverted or extroverted?</p>
				<select onChange={(e) => setTraitOne(e.target.value)}>
					<option>Introverted: Shy, Reserve, Passive</option>
					<option>Extroverted: Social, Outgoing </option>
				</select> <br />

				<p>Is your recipient intutitive or observant?</p>
				<select onChange={(e) => setTraitTwo(e.target.value)}>
					<option>Intutitive: using imagination or seeking new ideas</option>
					<option>observant: in touch with present, the here and now</option>
				</select> <br />

				<p>Is your recipient feeling ( ) or thinking ()?</p>
				<select onChange={(e) => setTraitThree(e.target.value)}>
					<option>feeling</option>
					<option>thinking</option>
				</select> <br />

				<p>Is your recipient judging ( ) or prospecting ()?</p>
				<select onChange={(e) => setTraitFour(e.target.value)}>
					<option>prospecting</option>
					<option>judging</option>
				</select> <br />



				{/* <input type="checkbox" onChange={(e) => setBlah(e.target.checked)}/> <span> Afdsfsdfsdfsdfsdfsdfsdfsd</span> <br /> <br /> */}
				{/* <button type="submit ">Submit</button> */}
				<Button
						className='button is-small is-success mt-2'
						// disabled={!(userFormData.username && userFormData.email && userFormData.password)}
						type='submit'
						variant='success'>
						Submit
					</Button>
			</form>

			{/* This is needed for the validation functionality above */}
			<div className='box column is-4 mt-5 ml-3 pt-3 pb-3 has-background-dark'>
				<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
					{/* show alert if server response is bad */}
					<Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='warning'>
						Something went wrong with your input!
					</Alert>

					<Form.Group>
						<Form.Label htmlFor='traitOne'>TestOne: </Form.Label>
						<Form.Control
							type='text'
							placeholder='Your first trait'
							name='traitOne'
							onChange={handleInputChange}
							value={userFormData.traitOne}
							required
						/>
						{/* {checkReq ('username')} */}
					</Form.Group>
					{/*   
		  <Form.Group>
			<Form.Label htmlFor='email'>Email: </Form.Label>
			<Form.Control
			  type='email'
			  placeholder='Your email address'
			  name='email'
			  onChange={handleInputChange}
			  value={userFormData.email}
			  required
			/>
			{checkReq ('email')}
		  </Form.Group>
  
		  <Form.Group>
			<Form.Label htmlFor='password'>Password: </Form.Label>
			<Form.Control
			  type='password'
			  placeholder='Your password'
			  name='password'
			  onChange={handleInputChange}
			  value={userFormData.password}
			  required
			/>
			 {checkReq ('password')}
		  </Form.Group> */}
					<Button
						className='button is-small is-success mt-2'
						disabled={!(userFormData.username && userFormData.email && userFormData.password)}
						type='submit'
						variant='success'>
						Submit
					</Button>
				</Form>
			</div>
		</>
	);
}
