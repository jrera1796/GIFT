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

export const ADD_RECIPIENT = gql `
mutation addRecipient($firstname: String!, $lastname: String!, $traits: String!) {
  addRecipient(firstname: $firstname, lastname: $lastname, traits: $traits) {
    _id
     traits
    lastname
    firstname
  }
}
`;

export const SAVE_GIFT = gql`
  mutation saveGift($recipientId: String!, $giftData: storeGift!) {
    saveGift(recipientId: $recipientId, giftData: $giftData) {
      _id
      lastname
      savedGifts {
        giftId
        giftname
        description
        link
        image
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
        giftname
        description
        link
        image
      }
    }
  }
`;

