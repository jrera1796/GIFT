import React, { useState } from 'react';
import RecipientList from '../components/RecipientList';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_RECIPIENT } from '../utils/mutations';
import { GET_USER, GET_RECIPIENTS } from '../utils/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
	const { loading, data } = useQuery(GET_USER);
	const [userFormData, setUserFormData] = useState({
		firstname: 'first',
		lastname: 'last',
		traits: 'TEST',
	});
	const user = data?.me || {};
	const { loading: loadingRec, data: dataRec } = useQuery(GET_RECIPIENTS, {
		variables: { _id: user._id },
	});
	const [addRecipient, { error }] = useMutation(ADD_RECIPIENT, {
		update(cache, { data: { addRecipient } }) {
			try {
				const { recipients } = cache.readQuery({
					query: GET_RECIPIENTS,
					variables: { _id: user._id },
				});
				cache.writeQuery({
					query: GET_RECIPIENTS,
					data: { recipients: [addRecipient, ...recipients] },
				});
			} catch (e) {
				console.log(e);
			}
			const { me } = cache.readQuery({ query: GET_USER });
			cache.writeQuery({
				query: GET_USER,
				data: {
					me: { ...me, recipients: [...dataRec.recipients, addRecipient] },
				},
			});
		},
	});
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const { data } = await addRecipient({ variables: { ...userFormData } });
			console.log(data);
		} catch (err) {
			console.log(err);
		}
		setUserFormData({ firstname: '', lastname: '', traits: '' });
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
				<FontAwesomeIcon icon={faHandMiddleFinger}></FontAwesomeIcon> Hello{' '}
				{`${user.username}`}!
			</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>First Name:</label>
					<input
						className="input"
						type="text"
						name="firstname"
						value={userFormData.firstname}
						onChange={e =>
							setUserFormData({ ...userFormData, firstname: e.target.value })
						}
					/>
				</div>
				<div>
					<label>Last Name:</label>
					<input
						className="input"
						type="text"
						name="lastname"
						value={userFormData.lastname}
						onChange={e =>
							setUserFormData({ ...userFormData, lastname: e.target.value })
						}
					/>
				</div>
				<div>
					<label>Trait:</label>
					<input
						className="input"
						type="text"
						name="traits"
						value={userFormData.traits}
						onChange={e =>
							setUserFormData({ ...userFormData, traits: e.target.value })
						}
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
					recipients={user.recipients}
				/>
			</div>
		</>
	);
}
