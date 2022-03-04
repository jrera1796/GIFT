import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;

export const ADD_RECIPIENT = gql`
	mutation addRecipient(
		$firstname: String!
		$lastname: String!
		$traits: String!
	) {
		addRecipient(firstname: $firstname, lastname: $lastname, traits: $traits) {
			_id
			traits
			lastname
			firstname
		}
	}
`;

export const REMOVE_RECIPIENT = gql`
	mutation removeRecipient($recipientId: ID!) {
		removeRecipient(recipientId: $recipientId) {
			_id
			username
			email
			recipients {
				_id
				traits
				firstname
				lastname
			}
		}
	}
`;

export const UPDATE_RECIPIENT = gql `
mutation updateRecipient($recipientId: ID!, $firstname: String, $lastname: String, $traits: String) {
  updateRecipient(recipientId: $recipientId, firstname: $firstname, lastname: $lastname, traits: $traits) {
    _id
     traits
    lastname
    firstname
  }
}
`;

export const SAVE_GIFT = gql`
	mutation saveGift($recipientId: String, $giftData: storeGift) {
		saveGift(recipientId: $recipientId, giftData: $giftData) {
			_id
			lastname
			savedGifts {
				giftId
				title
				image
				link
			}
		}
	}
`;

export const REMOVE_GIFT = gql`
	mutation removeGift($recipientId: String!, $giftId: String!) {
		removeGift(recipientId: $recipientId, giftId: $giftId) {
			_id
			lastname
			savedGifts {
				giftId
				title
				image
				link
			}
		}
	}
`;
