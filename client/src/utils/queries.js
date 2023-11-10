import { gql } from '@apollo/client';


export const GET_ME = gql`
  query me {
    me {
      _id
      context.user.username
      email
    
    }
  }
`;