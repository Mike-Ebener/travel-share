const { User, Trip } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('trips')
                .populate('friends');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
          },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('trips');
    },
    trips: async (parent, { username }) => {
      const params = username ? { username } : {};
      return trip.find(params).sort({ createdAt: -1 });
    },
    trip: async (parent, { _id }) => {
      return trip.findOne({ _id });
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
      
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      },
      addTrip: async (parent, args, context) => {
        if (context.user) {
          const trip = await Trip.create({ ...args, username: context.user.username });
      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { trips: trip._id } },
            { new: true }
          );
      
          return trip;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addReaction: async (parent, { tripId, reactionBody }, context) => {
        if (context.user) {
          const updatedTrip = await trip.findOneAndUpdate(
            { _id: tripId },
            { $push: { reactions: { reactionBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
      
          return updatedTrip;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');
      
          return updatedUser;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      }
  }
};

module.exports = resolvers;
