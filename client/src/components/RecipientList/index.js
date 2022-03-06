import { React, useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_RECIPIENT } from '../../utils/mutations';

import { GET_USER } from '../../utils/queries';
import { removeRecipientId } from '../../utils/localStorage';
import RecipientProfile from '../RecipientProfile';

const RecipientList = ({ username, recipients }) => {
	const { loading, data } = useQuery(GET_USER);
	const [removeRecipient, { error }] = useMutation(REMOVE_RECIPIENT);
	const user = data?.me || {};
	const [data1, setData] = useState('');
	if (!user.recipients) {
		return (
			<p className="bg-dark text-light p-3">
				{user.username}, add some recipients!
			</p>
		);
	}

	const handleSubmit = async recipientId => {
		try {
			const { data } = await removeRecipient({ variables: { recipientId } });
			console.log(data);
			removeRecipientId(recipientId);
		} catch (error) {
			console.log(error);
		}
	};

	const parentToChild = () => {
	};

	if (loading) {
		return <h2>Wait, Loading...</h2>;
	}

	return (
		<>
			<div>
				{user.recipients.map(recArr => (
					<form className="has-text-weight-bold has-text-white">
						<div key={recArr._id} className="box has-background-dark receipient-list-box mb-5">
							<h6 className='is-size-5 has-text-weight-bold has-text-white'>
								{recArr.firstname} {recArr.lastname} {'with '}
								{recArr.traits}{' trait'}
							</h6>
							<RecipientProfile parentToChild={recArr._id} />
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
