const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    balance: Int
    isChoreBuddy: Boolean
  }

  type Chore {
    _id: ID
    title: String
    description: String
    family: Family
    assignee: User
    rewardAmount: Int
    isComplete: Boolean
  }

  type Family {
    _id: ID
    familyName: String
    members: [User]
  }

  type Auth {
    token: ID!
    currentUser: User
  }

  type Query {
    currentUser(email: String!): User
    unassignedChores(familyId: ID!): [Chore]
    getUserFamily: Family
    #this is the child's id
    getChildChores(_id: ID!): [Chore]
    ##this is the family id
    getChildrenInFamily(_id: ID!): [User]
    ##this is the family id
    getAllChildrenChores(_id: ID!): [Chore]
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      familyName:String!
    ): Auth
    login(email: String!, password: String!): Auth
    createChild(firstName: String!, lastName: String!, email: String!, password: String!, familyId: ID!): User
    editChild(_id: ID!, balance: Int): User
    deleteChild(_id: ID!): User
    createFamily(familyName: String!): Family
    createChore(title:String, description: String, family: ID, rewardAmount: Int): Chore
    choreAssignment(_id:ID!, assignee: ID ): Chore
    completeChore(_id: ID!): Chore
  }
`;

module.exports = typeDefs;
