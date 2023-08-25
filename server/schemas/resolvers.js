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
      childrenIdsName.map(({id, firstName}) => {
        let chores = Chore.findAll({assignee: id});
        Object.defineProperty(allChores, firstName, {value: chores});
      })
      return allChores;
    }
  },

  Mutation: {
    register: async (parent, { firstName, lastName, email, password }) => {
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
    createChild: async(parent, {firstName, lastName, email, password, familyId }) => {
      const newChild = await User.create({firstName, lastName, email, password, isChoreBuddy: true});
      await Family.findOneAndUpdate(
        { _id: familyId },
        { $addToSet: { members: newChild._id } }
      );
      return newChild;
    },
    createFamily: async(parent, {familyName}) => {
      const newFam = await Family.create({familyName})
      return newFam
    },
    editChoreStatus: async(parent, {_id}) => {
      const completedChore = await Chore.findOneAndUpdate(
        { _id },
        {isCompleted: true},
        {new: true})
      return completedChore
    }
  },
};

module.exports = resolvers;
