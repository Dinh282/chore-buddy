const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    balance: Number
    isChoreBuddy: Boolean
  }

  type Chore {
    _id:ID
    title: String
    description: String
    family: ID
    assignee: ID
    rewardAmount:Number
    isComplete: Boolean
  }

  type Family {
    _id:ID
    familyName:String
    members:[User]
  }

  type Auth {
    token: ID!
    currentUser: User
  }

  type Query {
    currentUser(email: String!): User
    unassignedChores(family:String!, assigned:String!): Chore
    user(_id:ID!,isChoreBuddy:Boolean!):User
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    choreAssignment(_id:ID!,assignee:ID ) : Chore
    editChild(_id:ID!, balance:Number!):User
    deleteChild(_id:ID!):User
    createFamily(familyName:String!):Family
    updateFamily(_id:ID,members:ID):Family
    createChore(title:String, description:String, family:ID, rewardAmount:Number) :Chore
    editchore(_id:ID, assignee:ID):Chore
  }
`;

module.exports = typeDefs;
