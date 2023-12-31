// This is defining the queries that can be performed on your API. In this case, there are three queries: users, user, and me. The users query returns an array of User objects, the user query returns a single User object based on the provided username, and the me query returns the User object of the currently authenticated user.

const typeDefs = `#graphql
type Query  {
    
    me: User
  }
type User  { 
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book] 
} 
input BookInput {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String 
}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(BookData: BookInput!): User
   
    removeBook(BookId: ID!): User

    
  } 
type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
  
  } 
  type Auth { 
    token: ID!
    user: User
  } 
`;
module.exports = typeDefs;
