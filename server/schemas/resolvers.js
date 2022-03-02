const { AuthenticationError } = require('apollo-server-express'); //import auth
const { User, Recipient } = require('../models'); //import User model
const { signToken } = require('../utils/auth'); //import sign token form auth

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
			throw new AuthenticationError('User Not Logged In');
		},
		users: async () => {
			return User.find().select('-__v -password');
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).select('-__v -password');
		},
		recipients: async (parent, { _id }) => {
			const params = _id ? { _id } : {};
			console.log(params);
			console.log('got here');

			const test = await User.findOne(params).populate('recipients');
			console.log('test ', test);
			return test.recipients;
		},
		recipient: async (parent, { _id }) => {
			return Recipient.findOne({ _id });
		},
	},
	Mutation: {
		loginUser: async (parent, { email, password }) => {
			//authenticate a user to login
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError('User Not Found');
			}
			const matchPw = await user.isCorrectPassword(password);
			if (!matchPw) {
				throw new AuthenticationError('Incorrect Password');
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
			console.log('trying to addRecipeint');
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
			throw new AuthenticationError('You need to be logged in!');
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
			throw new AuthenticationError('Please Log In.');
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
		removeRecipient: async (parent, { recipientId }, context) => {
			if (context.user) {
				const deleteRecipient = await User.findByIdAndUpdate(
					//const updateUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { recipients: { recipientId } } },
					{ new: true }
				);
				return deleteRecipient;
			}
		},
	},
};

module.exports = resolvers;
