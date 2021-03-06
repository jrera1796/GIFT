const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String
		email: String
		recipients: [Recipient]
		recipientCount: Int
	}

	type Recipient {
		_id: ID
		traits: String
		lastname: String
		firstname: String
		giftCount: Int
		savedGifts: [Gift]
	}

	type Gift {
		_id: ID
		giftId: String
		title: String
		image: String
		link: String
	}

	type Auth {
		token: ID!
		user: User
	}

	input storeGift {
		giftId: String
		title: String
		image: String
		link: String
	}

	type Query {
		me: User
		users: [User]
		user(username: String!): User
		recipients(_id: ID): [Recipient]
		recipient(_id: ID!): Recipient
	}

	type Mutation {
		loginUser(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		addRecipient(firstname: String!, lastname: String!, traits: String!): Recipient
    	updateRecipient(recipientId: ID!, firstname: String, lastname: String, traits: String): Recipient
    	removeRecipient(recipientId: ID!): User
		saveGift(recipientId: ID, giftData: storeGift): Recipient
		removeGift(recipientId: String!, giftId: String!): Recipient
	}
`;

module.exports = typeDefs;
