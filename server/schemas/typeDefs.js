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
		giftId: String!
		giftname: String
		description: String
		link: String
		image: String
	}

	type Auth {
		token: ID!
		user: User
	}

	input storeGift {
		giftId: String!
		giftname: String
		description: String
		link: String
		image: String
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
		addRecipient(
			firstname: String!
			lastname: String!
			traits: String!
		): Recipient
		saveGift(recipientId: String!, giftData: storeGift!): Recipient
		removeGift(recipientId: String!, giftId: String!): Recipient
		removeRecipient(recipientId: String!): User
	}
`;

module.exports = typeDefs;
