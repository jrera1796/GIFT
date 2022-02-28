import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import RecipientList from '../components/RecipientList';


import { ADD_RECIPIENT } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_RECIPIENTS } from '../utils/queries';
import Auth from '../utils/auth';

export default function Dashboard() {
	const { username: userParam } = useParams();
	const { loading, data } = useQuery(GET_ME, {
		variables: { username: userParam },
	});
	const [userFormData, setUserFormData] = useState({
		traits: 'test',
		lastname: '',
		firstname: '',
	});
	const user = data?.me || data?.user || {};

	// const [addRecipient, { error }] = useMutation(ADD_RECIPIENT, {
	// 	update(cache, { data: { addRecipient } }) {
	// 		try {
	// 			// update thought array's cache
	// 			// could potentially not exist yet, so wrap in a try/catch
	// 			const { recipients } = cache.readQuery({ query: GET_RECIPIENTS });
	// 			cache.writeQuery({
	// 				query: GET_RECIPIENTS,
	// 				data: { recipients: [addRecipient, ...recipients] },
	// 			});
	// 		} catch (e) {
	// 			console.error(e);
	// 		}

	// 		// update me object's cache
	// 		const { me } = cache.readQuery({ query: GET_ME });
	// 		cache.writeQuery({
	// 			query: GET_ME,
	// 			data: { me: { ...me, recipients: [...me.recipients, addRecipient] } },
	// 		});
	// 	},
	// });
	const [addRecipient, { error }] = useMutation(ADD_RECIPIENT);
	console.log(user)
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const {data} = await addRecipient({ variables: { ...userFormData } });
			Auth.login(data.addRecipient.token)
		} catch (err) {
			console.error(err);
		}
		setUserFormData({ traits: '', lastname: '', firstname: '' }); //set values to empty
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user?.username) {
		return (
			<h4>
				You need to be logged in to see this. Use the navigation links above to
				sign up or log in!
			</h4>
		);
	}
	return (
		<>
			<h2 className="bg-dark text-secondary p-3 display-inline-block">
				Hello {`${user.username}`}!
			</h2>
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
				<button
					className="button is-primary"
					data-testid="button"
					type="submit"
				>
					Submit
				</button>
			</form>
			<div className="col-12 col-lg-3 mb-3">
					<RecipientList
						username={user.username}
						recipientsCount={user.recipientsCount}
						recipients={user.recipients}
					/>
				</div>
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
