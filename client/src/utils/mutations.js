import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
  mutation SaveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      authors
      savedBooks {
        bookId
        title
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`; 
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;