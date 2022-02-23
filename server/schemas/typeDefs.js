const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    giftCount: Int
    savedGifts: [Gift]
  }

  type Gift {
    _id: ID
    giftId: String
    recieverName: String
    personality: [String]
    gifts: [String]
    experiences: [String]
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
    recieverName: String
    personality: [String]
    gifts: [String]
    experiences: [String]
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
    saveGift(gift: storeGift ): User
    removeGift(giftId: String!): User
  }
`;

module.exports = typeDefs;
