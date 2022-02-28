import React, { useState } from 'react';

import RecipientList from '../components/RecipientList';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_RECIPIENT } from '../utils/mutations';
import { GET_USER, GET_RECIPIENTS } from '../utils/queries';

export default function Dashboard() {
	const { loading, data } = useQuery(GET_USER);
	const [userFormData, setUserFormData] = useState({
		firstname: 'first', 
		lastname: 'last',
		traits: 'TEST'
	});
	const user = data?.me || {};

	const [addRecipient, { error }] = useMutation(ADD_RECIPIENT, {
		update(cache, { data: { addRecipient } }) {
			try {
				// update thought array's cache
				// could potentially not exist yet, so wrap in a try/catch
				const { recipients } = cache.readQuery({ query: GET_RECIPIENTS });
				console.log(recipients);
				cache.writeQuery({
					query: GET_RECIPIENTS,
					data: { recipients: [addRecipient, ...recipients] },
				});
			} catch (e) {
				console.log(e);
			}

			// update me object's cache
			const { me } = cache.readQuery({ query: GET_USER });
			cache.writeQuery({
				query: GET_USER,
				data: { me: { ...me, recipients: [...me.recipients, addRecipient] } },
			});
		},
	});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const { data } = await addRecipient({ variables: { ...userFormData } });
			console(data);
			// Auth.login(data.addRecipient.token);
		} catch (err) {
			console.log(err);
		}
		setUserFormData({ firstname: '', lastname: '', traits: '' }); //set values to empty
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
						name="firstname"
						input={setUserFormData.firstname}
						defaultValue={userFormData.firstname}
					/>
				</div>
				<div>
					<label>Last Name:</label>
					<input
						className="input"
						type="text"
						name="lastname"
						input={setUserFormData.lastname}
						defaultValue={setUserFormData.lastname}
					/>
				</div>
				<div>
					<label>Trait:</label>
					<input
						className="input"
						type="text"
						name="traits" 
						input={setUserFormData.traits}
						defaultValue={setUserFormData.traits}
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
