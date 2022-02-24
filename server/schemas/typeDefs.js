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
    lastname: String
    firstname: String
    traits: String
    gifts: [Gift]
    giftCount: Int
  }

  type Gift {
    _id: ID
    giftId: String!
    giftname: String
    description: String
    link: String
    image: String
    price: String
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
    price: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    recipients(firstname: String, lastname: String): [Recipient]
    recipient(_id: ID!): Recipient
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addRecipient(firstname: String!, lastname: String!): User
    saveGift(gift: storeGift!): Recipient
    removeGift(giftId: ID!): Recipient
  }
`;

module.exports = typeDefs;
