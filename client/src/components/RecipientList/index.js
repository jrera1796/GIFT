import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_RECIPIENT } from '../../utils/mutations';
import { GET_USER } from '../../utils/queries';
import {removeRecipientId} from '../../utils/localStorage';

const RecipientList = ({ username, recipients }) => {
	const { loading, data } = useQuery(GET_USER);
	const [removeRecipient, { error }] = useMutation(REMOVE_RECIPIENT);
	const user = data?.me || {};

	if (!user.recipients) {
		return (
			<p className="bg-dark text-light p-3">
				{user.username}, add some recipients!
			</p>
		);
	}

	const handleSubmit = async (recipientId) => {
		console.log(`recipientId ${recipientId}`)
		try {
			const { data } = await removeRecipient({ variables: { recipientId }, });
			console.log(data);
			removeRecipientId(recipientId);
		} catch (error) {
			console.log(error);
		}
	};
	if (loading) {
		return <h2>Wait, Loading...</h2>
	  }

	  console.log(user.recipients)
	return (
		<>
			<div>
				{user.recipients.map(recArr => (
					<form className="has-text-weight-bold">
						<div
							key={recArr._id}>
							<h6>
								{recArr.firstname} {recArr.lastname} {recArr._id} {recArr.traits}{' '}
							</h6>
							<button
								className="button is-danger"
								data-testid="button"
								onClick={() => handleSubmit(recArr._id)}
							>
								Delete
							</button>
						</div>
					</form>
				))}
			</div>
		</>
	);
};

export default RecipientList;
