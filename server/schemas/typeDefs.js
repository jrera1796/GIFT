const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    savedRecipient: [Recipient]
    savedGifts: [Gift]
    giftCount: Int
  }

  type Recipient {
    _id: ID
    lastname: String
    firstname: String
    traits: String
    gifts: [Gift]
  }

  type Gift {
    _id: ID
    giftId: String!
    name: String
    description: String
    link: String
    image: String
    price: Decimal
  }

  type Auth {
    token: ID!
    user: User
  }

  input storeGift {
    giftId: String!
    name: String
    description: String
    link: String
    image: String
    price: Decimal
  }

  type Query {
    me: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGift(gift: storeGift!): User
    removeGift(giftId: ID!): User
  }
`;

module.exports = typeDefs;
