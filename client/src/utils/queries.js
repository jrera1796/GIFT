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
