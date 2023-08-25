import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      currentUser {
        email
        firstName
        lastName
        _id
      }
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      currentUser {
        firstName
        lastName
      }
      token
    }
  }
`;

export const EDIT_CHILD = gql`
  mutation editChild($_id: ID!, $balance: Int) {
    editChild(_id: $_id, balance: $balance) {
      _id
      firstName
      lastName
      email
      balance
      isChoreBuddy
    }
  }
`;

export const DELETE_CHILD = gql`
  mutation deleteChild($_id: ID!) {
    deleteChild(_id: $_id) {
      _id
      firstName
      lastName
      email
      balance
      isChoreBuddy
    }
  }
`;

export const CREATE_CHORE = gql`
  mutation createChore(
    $title: String
    $description: String
    $family: ID
    $rewardAmount: Int
  ) {
    createChore(
      title: $title
      description: $description
      family: $family
      rewardAmount: $rewardAmount
    ) {
      _id
      title
      description
      family
      assignee
      rewardAmount
      isComplete
    }
  }
`;

export const CHORE_ASSIGNMENT = gql`
  mutation choreAssignment($_id: ID!, $assignee: ID) {
    choreAssignment(_id: $_id, assignee: $assignee) {
      _id
      title
      description
      family
      assignee
      rewardAmount
      isComplete
    }
  }
`;
