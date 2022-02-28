import React, { useState } from 'react';

import { Form, Button, Alert, Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import 'bulma/css/bulma.css';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
export default function PersonalityTest() {
	const [showModal, setShowModal] = useState(false);
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
		console.log("all data", traitOne, traitTwo, traitThree, traitFour);
	}



	return (
		<>
			<h1>Your Personality Test</h1>
			<Form className='box column is-4 mt-5 ml-3 pt-3 pb-3 has-background-light' onSubmit={testResult}>
				<p>Is your recipient introverted (I) or extroverted (E)?</p>
				
				<select onChange={(e) => setTraitOne(e.target.value)}>
					<option value='I'>Introverted: Private, Reserve, Passive</option>
					<option value='E'>Extroverted: Social, Talkative, Assertive </option>
				</select> <br />

				<p>Is your recipient intutitive (N) or observant (S)?</p>
				<select onChange={(e) => setTraitTwo(e.target.value)}>
					<option value='N'>Intutitive: Imaginative, Inventive, Idealistic</option>
					<option value='S'>Observant: Practical, Factual, Realistic</option>
				</select> <br />

				<p>Is your recipient feeling (F) or thinking (T)?</p>
				<select onChange={(e) => setTraitThree(e.target.value)}>
					<option value='F'>Feeling: Empathetic, Passionate, Caring</option>
					<option value='T'>Thinking: Logical, Objective, Rational</option>
				</select> <br />

				<p>Is your recipient judging (J) or prospecting (P)?</p>
				<select onChange={(e) => setTraitFour(e.target.value)}>
					<option value='P'>Prospecting: Relaxed, Spontaneous, Flexible</option>
					<option value='J'>Judging: Decisive, Structured, Organized</option>
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
			</Form>
			set modal data up
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
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
