const { gql } = require('apollo-server-express');

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
    unassignedChores(family:String!, assigned:String!): Chore
    getUser(_id:ID!, isChoreBuddy:Boolean!):User
    getChildChores: [Chore]
    getChildrenInFamily(_id: ID!): User
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createChild(firstName: String!, lastName: String!, email: String!, password: String!, isChoreBuddy: Boolean): User
    editChild(_id: ID!, balance: Int): User
    deleteChild(_id: ID!): User
    createFamily(familyName: String!): Family
    createChore(title:String, description: String, family: ID, rewardAmount: Int): Chore
    choreAssignment(_id:ID!, assignee: ID ): Chore
  }
`;

module.exports = typeDefs;
