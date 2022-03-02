import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_RECIPIENT } from '../../utils/mutations';
import { GET_USER } from '../../utils/queries';

const RecipientList = ({ username, recipients }) => {
	const { loading, data } = useQuery(GET_USER);
	const [removeRecipient, { error }] = useMutation(REMOVE_RECIPIENT);
	const user = data?.me || {};

	console.log(data);
	if (!user.recipients || !user.recipients) {
		return (
			<p className="bg-dark text-light p-3">
				{user.username}, add some recipients!
			</p>
		);
	}

	const handleSubmit = async (recipientId,e) => {
		e.preventDefault();
		console.log(`recipientId ${recipientId}`)
		try {
			const { data } = await removeRecipient({ recipientId: { recipientId } });
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div>
				{user.recipients.map(recipients => (
					<form className="has-text-weight-bold">
						<div>
							<h6>
								{recipients.firstname} {recipients.lastname} {recipients._id}{' '}
							</h6>
							<button
								className="button is-danger"
								data-testid="button"
								onClick={() => handleSubmit(recipients._id)}
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
