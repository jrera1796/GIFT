import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  useEffect(() => {
    if (error) { setShowAlert(true); }
    else { setShowAlert(false); }
  }, [error]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget; //check form (as per react-bootstrap docs)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try { //wait for a response from loginUser for data
      const { data } = await loginUser({ variables: { ...userFormData } });
      Auth.login(data.loginUser.token) //token given to loginUser
    } catch (err) { console.error(err); }
    setUserFormData({ username: '', email: '', password: '' }); //set values to empty

    
  };

  const checkReq = (inputReq) => { 
    switch (inputReq) {
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
    <div className='box is-full mt-5 ml-3 pt-3 pb-3 has-background-dark ' >
      
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="has-text-white">
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='warning'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email: </Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
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
          className='button is-small is-success mt-2'
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Login
        </Button>
      </Form>     
     </div>
  );
};

export default LoginForm;
