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
mutation addRecipient($firstname: String!, $lastname: String!) {
  addRecipient(firstname: $firstname, lastname: $lastname) {
    _id
    lastname
    firstname
    traits
    giftCount
    gifts {
      _id
    }
  }
}
`;

export const SAVE_GIFT = gql`
  mutation saveGift($gift: storeGift!) {
    saveBook(gift: $gift) {
      _id
      username
      email
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

export const REMOVE_GIFT = gql`
  mutation removeGift($giftId: ID!) {
    removeGift(giftId: $giftId) {
      _id
      username
      email
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

