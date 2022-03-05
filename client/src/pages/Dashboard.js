import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipientList from '../components/RecipientList';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_RECIPIENT } from '../utils/mutations';
import { GET_USER, GET_RECIPIENTS } from '../utils/queries';
import RecipientProfile from '../components/RecipientProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
	const { loading, data } = useQuery(GET_USER);
	const [userFormData, setUserFormData] = useState({
		firstname: 'first',
		lastname: 'last',
		traits: 'NULL',
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
			window.location.href = `/test?id=${data.addRecipient._id}&first=${userFormData.firstname}&last=${userFormData.lastname}`;
		} catch (err) {
			console.log(err);
		}
		setUserFormData({ firstname: '', lastname: '', traits: 'NULL' });
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
		<div className='Hero'>
			<div className='hero-body'>
			<h2 className="bg-dark text-secondary p-3 display-inline-block is-size-4">
				<FontAwesomeIcon icon={faIdCard} size="2x"></FontAwesomeIcon> Hello{' '}
				{`${user.username}`}!
			</h2>
			<form onSubmit={handleSubmit} className="has-text-weight-bold">
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
				<br></br>
				<button
					className="button is-primary"
					data-testid="button"
					type="submit"
				>
					<Link to={{ pathname: '/test', state: data }} />
					Submit
				</button>
			</form>
			<div className="col-12 col-lg-3 mb-3 recipient-list">
				<RecipientList />
				<RecipientProfile />
			</div>
			</div>
			</div>
		</>
	);
}
