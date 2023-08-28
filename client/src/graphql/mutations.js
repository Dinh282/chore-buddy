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
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
    $family: String!
  ) {
    register(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      family: $family
    ) {
      currentUser {
        firstName
        lastName
      }
      token
    }
  }
`;

export const CREATE_CHILD = gql`
  mutation createChild($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createChild(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      balance
      isChoreBuddy
    }
  }
`;

export const EDIT_CHILD = gql`
  mutation editChild($childId: ID!, $balance: Int) {
    editChild(childId: $childId, balance: $balance) {
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
  mutation deleteChild($childId: ID!) {
    deleteChild(childId: $childId) {
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
  mutation createChore($title: String, $rewardAmount: Int, $assignee: ID!) {
    createChore(title: $title, rewardAmount: $rewardAmount, assignee: $assignee) {
      _id
      title
      assignee {
        _id
        firstName
        lastName
        email
      }
      rewardAmount
      isComplete
    }
  }
`;

export const CHORE_ASSIGNMENT = gql`
  mutation choreAssignment($choreId: ID!) {
    choreAssignment(choreId: $choreId) {
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

export const TOGGLE_AND_COMPLETE_CHORE = gql`
  mutation toggleAndCompleteChore($choreId: ID!, $isComplete: Boolean!) {
    toggleAndCompleteChore(choreId: $choreId, isComplete: $isComplete) {
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
