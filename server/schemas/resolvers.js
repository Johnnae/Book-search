const { User, Book } = require('../models'); 
const { signToken, AuthenticationError } = require('../utils/auth'); 

const resolvers = { 
    Query: { 
        users: async () => { 
            return User.find().populate('savedBooks'); 
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate(`savedBooks`)
    } 

}