import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPIENT } from '../../utils/queries';

const RecipientList =  ({username, recipients }) => {
	// const { loading, data } = useQuery(GET_RECIPIENT);
	if (!recipients || !recipients) {
		return (
			<p className="bg-dark text-light p-3">{username}, add some recipients!</p>
		);
	}

	return (
    <>
		<div>
			{recipients.map(recipients => (
				<div>
					<h6>{recipients.firstname} {recipients.lastname} </h6>
					<button key={recipients._id}>
						<Link to={`/profile/${recipients.username}`}>
							{recipients.username}
						</Link>
					</button>
				</div>
			))}
		</div>
    </>
	);
};

export default RecipientList;
