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
				traits
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

export const GET_RECIPIENT = gql`
	query recipient($_id: ID) {
		recipient(_id: $_id) {
			_id
			firstname
			lastname
			traits
			savedGifts {
				giftId
				title
				image
				link
			}
		}
	}
`;
