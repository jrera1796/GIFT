const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedGifts: [Gift]
  }

  type Gift {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input acceptGift {
    giftId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGift(gift: acceptGift ): User
    removeGift(giftId: String!): User
  }
`;

module.exports = typeDefs;
