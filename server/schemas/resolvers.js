
const { User, Chore, Family } = require('../models');
const { signToken, AuthenticationError } = require('../utils');


const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),
    getUserFamily: async(parent, args, context) => {
      if(context.user){
        const usersFam = await Family.findOne({ members: { $in: context.user._id } });
        return usersFam;
      }
    },
    getChildChores: async(parent, {_id}, context) => {
      const chores = await Chore.findAll({assignee: _id})
      return chores
    },
    getChildrenInFamily: async(parent, {_id}, context) => {
      const family = await Family.findOne({_id}).populate('user');
      const members = family.members
      const children = members.filter(member => member.isChoreBudy === true);
      return children
    },
    getAllChildrenChores: async(parent, {_id}, context)=> {
      const family = await Family.findOne({_id}).populate('user')
      const members = family.members
      const children = members.filter(member => member.isChoreBudy === true);
      const childrenIdsName = children.map(({_id, firstName}) => ({
        id: _id,
        firstName: `${firstName}`,
      }));
      let allChores = {};
      childrenIdsName.map(async ({id, firstName}) => {
        let chores = await Chore.findAll({assignee: id});
        Object.defineProperty(allChores, firstName, {value: chores});
      })
      return allChores;
    },
    unassignedChores: async (parent, { familyId }) => {
      const unassignedChores = await Chore.findAll({ family: familyId, assignee: null });
      return unassignedChores
    }
  },

  Mutation: {
    register: async (
      parent,
      { firstName, lastName, email, password, familyName }
    ) => {
      const newFamily = await Family.create({familyName})
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
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
    createFamily: async(parent, {familyName}) => {
      const newFam = await Family.create({familyName})
      return newFam
    },
    completeChore: async(parent, {_id}) => {
      const completedChore = await Chore.findOneAndUpdate(
        { _id },
        {isCompleted: true},
        {new: true}
      )
      return completedChore
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
      { title, description, family, rewardAmount },
      context
    ) => {
      if (context.user) {
        const chore = await Chore.create({
          title,
          description,
          family,
          rewardAmount,
          isComplete: false,
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
