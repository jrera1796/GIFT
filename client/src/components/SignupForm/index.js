import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' }); //init state form
  const [validated] = useState(false); //validate state form
  const [showAlert, setShowAlert] = useState(false); //alert for state form
  const [addUser, { error }] = useMutation(ADD_USER); //setup addUser when signUp

  useEffect(() => {
    if (error) { setShowAlert(true); }
    else { setShowAlert(false); }
  }, [error])

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

    try { //wait for a response from addUser for data
      const { data } = await addUser({ variables: { ...userFormData } });
      Auth.login(data.addUser.token) //token given to the new user (addUser)
    } catch (err) { console.error(err); }
    setUserFormData({ username: '', email: '', password: '', }); //set values to empty
  };

  const checkReq = (inputReq) => { 
    switch (inputReq) {
      case 'username':
        if (userFormData.username.length <= 0) {
          return (<Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>);
        }
        break;
      case 'email':
        if (userFormData.email.length <= 0) {
          return (<Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>);
        }
        break;
      case 'password':
        if (userFormData.password.length <= 0) {
          return (<Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>);
        }
        break;
      default:
        break;
    }

  }


  return (
    <>
      {/* This is needed for the validation functionality above */}
      <div className='box is-full mt-5 ml-3 pt-3 pb-3 has-background-dark login-box'>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="has-text-white">
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='warning'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group >
          <Form.Label htmlFor='username'>Username: </Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          {checkReq ('username')}
        </Form.Group>

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
        </Form.Group>
        <Button
          className='button is-success mt-2'
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Signup
        </Button>
      </Form>
      </div>
    </>
  );
};

export default SignupForm;
