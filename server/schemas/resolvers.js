
const { User, Chore, Family } = require('../models');
const { signToken, AuthenticationError } = require('../utils');


const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),
    getCurrentUserFamily: async(parent, args, context) => {
      if(context.user){
        const usersFam = await Family.findOne({ members: { $in: context.user._id } });
        return usersFam;
      }
      throw AuthenticationError;
    },
    getChildChores: async(parent, {childId}, context) => {
      const chores = await Chore.find({assignee: childId}).populate('assignee');
      return chores
    },
    getChildrenInFamily: async(parent, {familyId}, context) => {
      const family = await Family.findOne({_id: familyId}).populate('members');
      const members = family.members
      const children = members.filter(member => member.isChoreBuddy === true);
      return children
    },
    getAllChildrenChores: async(parent, {familyId}, context)=> {
      const family = await Family.findOne({_id: familyId}).populate('members');
      const members = family.members
      const children = members.filter(member => member.isChoreBuddy === true);
      const childrenIds = children.map(({_id}) => ({id: _id.toHexString()}));
      let allChores = [];
      await Promise.all(childrenIds.map(async ({id}) => {
        let chores = await Chore.find({assignee: id}).populate('assignee');
        allChores.push(...chores);
      }))
      return allChores;
    },
    unassignedChores: async (parent, { familyId }) => {
      const unassignedChores = await Chore.find({ family: familyId, assignee: null }).populate('assignee');
      return unassignedChores
    }
  },

  Mutation: {
    register: async (
      parent,
      { firstName, lastName, email, password, family }
    ) => {
      const newFamily = await Family.create({familyName: family})
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        isChoreBuddy: false,
      });
      await Family.findByIdAndUpdate(
        {_id: newFamily._id}, {
        $addToSet: { members: newUser._id },
      });
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

    createChild: async(parent, {firstName, lastName, email, password, familyId }) => {
      const newChild = await User.create({firstName, lastName, email, password, isChoreBuddy: true});
      await Family.findOneAndUpdate(
        { _id: familyId },
        { $addToSet: { members: newChild._id } },
        { new: true }
      );
      return newChild;
    },

    completeChore: async(parent, {choreId}) => {
      const completedChore = await Chore.findOneAndUpdate(
        { _id: choreId },
        {isComplete: true},
        {new: true}
      )
      return completedChore
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
    createChore: async (
      parent,
      { title, family, rewardAmount },
      context
    ) => {
      if (context.user) {
        const chore = await Chore.create({
          title,
          family,
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
          { new: true },
        );
        return chore;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
