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

    getCurrentUser: User

    unassignedChores: [Chore]

    getChildChores(
      childId: ID!
    ): [Chore]

    getChildrenInFamily: [User]

    getAllChildrenChores: [Chore]
  }

  type Mutation {
    register(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
      family: String!
    ): Auth

    login(
      email: String!, 
      password: String!
    ): Auth

    createChild(
      firstName: String!, 
      lastName: String!, 
      email: String!, 
      password: String!
    ): User
    
    deleteChild(
      childId: ID!
    ): User

    createChore(
      title:String, 
      rewardAmount: Int,
      assignee: ID!
    ): Chore
    
    choreAssignment(
      choreId: ID!
    ): Chore
    
    toggleAndCompleteChore(
      choreId: ID!,
      isComplete: Boolean!
    ): Chore

    deleteChore(
      choreId: ID!
    ): Chore

    updateBalance(
      userId: ID!,
      balance: Int!
    ): User
  }
`;

module.exports = typeDefs;
