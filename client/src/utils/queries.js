import { gql } from '@apollo/client';

export const GET_USER = gql`
	{
		me {
			_id
			username
			email
		}
	}
`;

export const GET_ME = gql`
	{
		me {
			_id
			username
			email
		}
	}
`;

export const QUERY_RECIPIENTS = gql`
	query recipients($username: String) {
		recipients(username: $username) {
			_id
			traits
			lastname
			firstname
			giftCount
			savedGifts {
				giftId
				giftname
				description
				link
				image
				price
			}
		}
	}
`;
