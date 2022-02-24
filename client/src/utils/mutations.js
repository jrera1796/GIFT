import { gql } from '@apollo/client';
export const LOGIN_USER= gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user{
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
      user{
        _id
        username
        email
      }
    }
  }
`;

// export const ADD_RECIPIENT = gql `
// mutation addRecipient($firstname: String!, $lastname: String!) {
//   addRecipient(firstname: $firstname, lastname: $lastname) {
//     token
//     user{
//       _id
//       username
//       email
//     }
//   }
// }
// `;


// addRecipient(firstname: String!, lastname: String!): Recipient
// saveGift(gift: storeGift!): Recipient
// removeGift(giftId: ID!): Recipient
