const { assertType } = require('graphql');
const { User, Book } = require('../models'); 
const { signToken, AuthenticationError } = require('../utils/auth'); 

const resolvers = { 
    Query: { 
        users: async () => { 
            return User.find().populate('savedBooks'); 
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate(`savedBooks`);
    }, 
    books: async (parent, { username }) => { 
        const params = username ? { username } : {}; 
        return Book.find(params).sort({ createdAt: -1 }); 
    }, 
    book: async (parent, { bookId }) => {
        return Book.findOne({ _id: bookId }); 
    }, 
    me: async (parent, args, context) => { 
        if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('users');
          }
          throw AuthenticationError;
        },

}, 
Mutation: { 
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      addUser: async (parent, { userText }, context) => {
        if (context.user) {
          const user = await User.create({
            userText,
            userAuthor: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { users: user._id } }
          );
  
          return user;
        }
        throw AuthenticationError;
        ('You need to be logged in!');
      },
      addBook: async (parent, { userId, bookText }, context) => {
        if (context.user) {
          return user.findOneAndUpdate(
            { _id: userId },
            {
              $addToSet: {
                books: { bookText, bookAuthor: context.user.username },
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw AuthenticationError;
      },
      
      removeBook: async (parent, { userId, bookId }, context) => {
        if (context.user) {
          return user.findOneAndUpdate(
            { _id: userId },
            {
              $pull: {
                books: {
                  _id: bookId,
                  bookAuthor: context.user.username,
                },
              },
            },
            { new: true }
          );
        }
        throw AuthenticationError;
      },
    },
}; 
module.exports = resolvers;