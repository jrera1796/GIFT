import React, { useState } from 'react';
import { ADD_RECIPIENT } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_USER } from '../utils/queries';

export default function Dashboard() {
	const { loading, data } = useQuery(GET_USER); //useQuery Hook exe. GET_ME to save+load userData
	const UserData = data?.me || {};
	const [addRecipient, { error }] = useMutation(ADD_RECIPIENT);
	const [userFormData, setUserFormData] = useState({
		traits: 'test',
		lastName: '',
		firstName: '',
	});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			//wait for a response from addUser for data
			const { data } = await addRecipient({ variables: { ...userFormData } });
			Auth.login(data.addUser.token); //token given to the new user (addUser)
		} catch (err) {
			console.error(err);
		}
		setUserFormData({ traits: '', lastName: '', firstName: '' }); //set values to empty
	};

	return (
		<>
		<form onSubmit={handleSubmit}>
			<div>
				<label>First Name:</label>
				<input
					className="input"
					type="text"
					type="text"
					name="name"
					defaultValue={setUserFormData.firstName}
				/>
			</div>
			<div>
				<label>Last Name:</label>
				<input
					className="input"
					type="text"
					type="text"
					name="name"
					defaultValue={setUserFormData.lastName}
				/>
			</div>
			<br></br>
			<button className="button is-primary" data-testid="button" type="submit">
				Submit
			</button>
		</form>
		<section>
		
		</section>
		</>
	);
}

{
	/* <>
<Jumbotron fluid className="text-light bg-dark">
	<Container>
		<h1>Viewing saved books!</h1>
	</Container>
</Jumbotron>
<Container>
	<h2>
		{userData.savedBooks.length
			? `Viewing ${userData.savedBooks.length} saved ${
					userData.savedBooks.length === 1 ? 'book' : 'books'
			  }:`
			: 'You have no saved books!'}
	</h2>
	<CardColumns>
		{userData.savedBooks.map(book => {
			return (
				<Card key={book.bookId} border="dark">
					<Card.Body>
						<Card.Title>{"book.title"}</Card.Title>
						<p className="small">Authors: {"book.authors"}</p>
						<Card.Text>{"book.description"}</Card.Text>
						<Button
							className="btn-block btn-danger"
							onClick={() => console.log("Howdy")}
						>
							Delete this Book!
						</Button>
					</Card.Body>
				</Card>
			);
		})}
	</CardColumns>
</Container> */
}
