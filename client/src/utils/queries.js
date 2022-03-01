import { gql } from '@apollo/client';

export const GET_USER = gql`
	{
		me {
			_id
			username
			email
			recipientCount
			recipients {
				_id
				lastname
				firstname
			}
		}
	}
`;

export const GET_ME = gql`
	{
		me {
			_id
			username
			email
			recipientCount
			recipients {
				_id
				lastname
				firstname
			}
		}
	}
`;

export const GET_RECIPIENTS = gql`
	query recipients($_id: ID) {
		recipients(_id: $_id) {
			_id
			traits
			lastname
			firstname
		}
	}
`;
