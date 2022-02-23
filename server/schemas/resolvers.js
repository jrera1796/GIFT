const { AuthenticationError } = require('apollo-server-express'); //import auth
const { User} = require('../models'); //import User model
const { signToken } = require('../utils/auth'); //import sign token form auth

const resolvers = {
    Query: { //get the user
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('savedGifts');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        loginUser: async (parent, {email, password}) => { //authenticate a user to login
            const user = await User.findOne({ email });
            if(!user) { throw new AuthenticationError('User Not Found'); }
            const matchPw = await user.isCorrectPassword(password);
            if(!matchPw) { throw new AuthenticationError('Incorrect Password'); }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => { //signup (add) a user
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveGift: async (parent, { gift }, context) => { //save a gift
            if(context.user) {
                const updateGift = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $push: { savedGifts: gift }},
                    { new: true });
                return updateGift;
            }
            throw new AuthenticationError('Please Log In.');
        },
        // removeGift: async (parent, { giftId }, context) => { //remove a gift
        //     if(context.user) {
        //         const userData = await User.findByIdAndDelete(
        //             { _id: context.user._id},
        //             { $pull: { savedGifts: giftId}},
        //             { new: true });
        //         return userData;
        //     }
        // }
    }

};

module.exports = resolvers;
