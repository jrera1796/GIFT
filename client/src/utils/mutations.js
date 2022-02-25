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
mutation addRecipient($traits: String!, $lastname: String!, $firstname: String!) {
  addRecipient(traits: $traits) {
    _id
     traits
    lastname
    firstname
    giftCount
    gifts {
      _id
    }
  }
}
`;

export const SAVE_GIFT = gql`
  mutation saveGift($gift: storeGift!) {
    saveGift(gift: $gift) {
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

