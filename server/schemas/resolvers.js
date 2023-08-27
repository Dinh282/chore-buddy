const { User, Chore, Family } = require("../models");
const { signToken, AuthenticationError } = require("../utils");

const resolvers = {
  Query: {
    getCurrentUser: async (parent, { email }) => User.findOne({ email }),
    getChildChores: async (parent, { childId }, context) => {
      const chores = await Chore.find({ assignee: childId }).populate(
        "assignee"
      );
      return chores;
    },
    getChildrenInFamily: async (parent, args, context) => {
      if (context.user) {
        const usersFam = await Family.findOne({
          members: { $in: context.user._id },
        });

        const family = await Family.findOne({ _id: usersFam._id }).populate(
          "members"
        );

        const members = family.members;

        const children = members.filter(
          (member) => member.isChoreBuddy === true
        );

        return children;
      }
    },
    getAllChildrenChores: async (parent, args, context) => {
      if (context.user) {
        const usersFam = await Family.findOne({
          members: { $in: context.user._id },
        });

        const family = await Family.findOne({ _id: usersFam._id }).populate(
          "members"
        );

        const members = family.members;

        const children = members.filter(
          (member) => member.isChoreBuddy === true
        );

        const childrenIds = children.map(({ _id }) => ({
          id: _id.toHexString(),
        }));

        let allChores = [];

        await Promise.all(
          childrenIds.map(async ({ id }) => {
            let chores = await Chore.find({ assignee: id }).populate(
              "assignee"
            );
            allChores.push(...chores);
          })
        );

        return allChores;
      }
    },
    unassignedChores: async (parent, args, context) => {
      if (context.user) {
        const usersFam = await Family.findOne({
          members: { $in: context.user._id },
        });

        const unassignedChores = await Chore.find({
          family: usersFam._id,
          assignee: null,
        }).populate("assignee");

        return unassignedChores;
      }
    },
  },

  Mutation: {
    register: async (
      parent,
      { firstName, lastName, email, password, family }
    ) => {
      const newFamily = await Family.create({ familyName: family });
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        isChoreBuddy: false,
      });
      await Family.findByIdAndUpdate(
        { _id: newFamily._id },
        {
          $addToSet: { members: newUser._id },
        }
      );
      const token = signToken(newUser);
      return { token, currentUser: newUser };
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

    createChild: async (
      parent,
      { firstName, lastName, email, password },
      context
    ) => {
      if (context.user) {
        const usersFam = await Family.findOne({
          members: { $in: context.user._id },
        });
        const newChild = await User.create({
          firstName,
          lastName,
          email,
          password,
          isChoreBuddy: true,
        });
        await Family.findOneAndUpdate(
          { _id: usersFam._id },
          { $addToSet: { members: newChild._id } },
          { new: true }
        );
        return newChild;
      }
      throw AuthenticationError;
    },

    completeChore: async (parent, { choreId }) => {
      const completedChore = await Chore.findOneAndUpdate(
        { _id: choreId },
        { isComplete: true },
        { new: true }
      );
      return completedChore;
    },
    editChild: async (parent, { childId, balance }, context) => {
      if (context.user) {
        const child = await User.findOneAndUpdate(
          { _id: childId },
          { balance },
          { new: true }
        );
        return child;
      }
      throw AuthenticationError;
    },
    deleteChild: async (parent, { childId }, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: childId });
      }
      throw AuthenticationError;
    },
    createChore: async (parent, { title, rewardAmount }, context) => {
      console.log("LOGGED")
      if (context.user) {
        const usersFam = await Family.findOne({
          members: { $in: context.user._id },
        });

        const chore = await Chore.create({
          title,
          family: usersFam._id,
          rewardAmount,
          isComplete: false,
        });

        return chore;
      }
      throw AuthenticationError;
    },
    choreAssignment: async (parent, { choreId }, context) => {
      if (context.user) {
        const chore = await Chore.findByIdAndUpdate(
          { _id: choreId },
          { assignee: context.user._id },
          { new: true }
        );
        return chore;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
