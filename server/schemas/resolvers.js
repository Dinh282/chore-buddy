const { User, Chore, Family } = require("../models");
const { signToken, AuthenticationError } = require("../utils");

const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),

    unassignedChores: async (parent, { family, assignee }) =>
      Chore.find({ family, assignee }),

    getFamily: async (parent, { _id }) => Family.findOne({ _id }),
  },

  Mutation: {
    registerParent: async (
      parent,
      { firstName, lastName, email, password }
    ) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, currentUser: user };
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

      return { token, currentUser: user };
    },

    editChild: async (parent, { _id, balance }, context) => {
      if (context.user) {
        const child = await User.findOneAndUpdate(
          { _id },
          { balance },
          { new: true }
        );
        return child;
      }
      throw AuthenticationError;
    },

    deleteChild: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id });
      }
      throw AuthenticationError;
    },

    createChore: async (
      parent,
      { title, description, family, rewardAmount, isComplete },
      context
    ) => {
      if (context.user) {
        const chore = await Chore.create({
          title,
          description,
          family,
          rewardAmount,
          isComplete,
        });
        return chore;
      }
      throw AuthenticationError;
    },

    choreAssignment: async (parent, { _id }, context) => {
      if (context.user) {
        const chore = await Chore.findByIdAndUpdate(
          { _id },
          { assignee: context.user._id },
          {
            new: true,
          }
        );
        return chore;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
