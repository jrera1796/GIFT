// import { AuthenticationError } from '@apollo/server'
import { GraphQLError } from 'graphql'; // Code above has deprecated

import User from '../models/User.js'
import Recipient from '../models/Recipient.js'
import {signToken} from '../utils/auth.js';



const resolvers = {
	Query: {
		//get the user
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select(
					'-__v -password'
				);
				return userData;
			}
			throw new GraphQLError('User Not Logged In');
		},
		users: async () => {
			return User.find().select('-__v -password');
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).select('-__v -password');
		},
		recipients: async (parent, { _id }) => {
			const params = _id ? { _id } : {};
			const result = await User.findOne(params)
			.populate('recipients');
			return result.recipients;
		},
		recipient: async (parent, {_id}) => {
			return Recipient.findOne({_id});
		}
	},
	Mutation: {
		loginUser: async (parent, { email, password }) => {
			//authenticate a user to login
			const user = await User.findOne({ email });
			if (!user) {
				throw new GraphQLError('User Not Found');
			}
			const matchPw = await user.isCorrectPassword(password);
			if (!matchPw) {
				throw new GraphQLError('Incorrect Password');
			}
			const token = signToken(user);
			return { token, user };
		},
		addUser: async (parent, args) => {
			//signup (add) a user
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		addRecipient: async (parent, args, context) => {
			if (context.user) {
				const recipient = await Recipient.create({
					...args,
					username: context.user.username,
				});
				await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { recipients: recipient._id } },
					{ new: true }
				);
				return recipient;
			}
			throw new GraphQLError('Cannot Add Recipient!');
		},

		updateRecipient: async (parent, args , context) => {
			if (context.user) {
				console.log(args);
				const updateRecipient = await Recipient.findByIdAndUpdate(
					{ _id: args.recipientId },
					{ $set: {firstname: args.firstname, lastname: args.lastname, traits: args.traits }},
					{ new: true }
				);
				return updateRecipient;
			}
			throw new GraphQLError('Cannot Update Recipient!');
		},
		
		removeRecipient: async (parent, { recipientId }, context) => {
			if (context.user) {
				const updateUser = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $pull: { recipients:  recipientId } },
					{ new: true }
				);
				await Recipient.findByIdAndDelete({_id: recipientId});
				return updateUser;
			}
			throw new GraphQLError('Cannot Remove Recipient!');
		},

		saveGift: async (parent, { recipientId, giftData }, context) => {
			//save a gift
			if (context.user) {
				const updateRecipient = await Recipient.findByIdAndUpdate(
					{ _id: recipientId },
					{ $push: { savedGifts: giftData, username: context.user.username } },
					{ new: true }
				);
				return updateRecipient;
			}
			throw new GraphQLError('Please Log In.');
		},
		removeGift: async (parent, { recipientId, giftId }, context) => {
			//remove a gift
			if (context.user) {
				const updateRecipient = await Recipient.findByIdAndUpdate(
					{ _id: recipientId },
					{ $pull: { savedGifts: { giftId } } },
					{ new: true }
				);
				return updateRecipient;
			}
		},
	},
};

export default resolvers
