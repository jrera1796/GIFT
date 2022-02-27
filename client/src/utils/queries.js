import { gql } from '@apollo/client';

export const GET_USER = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;


export const GET_RECIPIENT = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
