import { gql } from "@apollo/client";

export const QUERY_CURRENT_USER = gql`
  query getCurrentUser($email: String!) {
    currentUser(email: $email) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_UNASSIGNED_CHORES = gql`
  query unassignedChores($family: ID!, assignee:ID!) {
    unassignedChores(family:$family, assignee:$assignee) {
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

export const QUERY_CURRENTUSER_FAMILY = gql`
  query getCurrentUserFamily {
    getCurrentUserFamily {
      _id
      familyName
    }
  }
`;

export const QUERY_CHILD_CHORES = gql`
  query getChildChores($childId: ID!) {
    getChildChores(childId: $childId) {
      _id
      assignee {
        _id
        firstName
        lastName
      }
      family {
        _id
      }
      isComplete
      rewardAmount
      title
    }
  }
`;
export const QUERY_CHILDREN_IN_FAMILY = gql`
  query getChildrenInFamily($familyId: ID!) {
    getChildrenInFamily(familyId: $familyId) {
      _id
      balance
      email
      firstName
      isChoreBuddy
      lastName
    }
  }
`;
export const QUERY_ALL_CHILDREN_CHORES = gql`
  query getAllChildrenChores($familyId: ID!) {
    getAllChildrenChores(familyId: $familyId) {
      _id
      assignee {
        _id
        firstName
        lastName
      }
      family {
        _id
      }
      isComplete
      rewardAmount
      title
    }
    }
  }
`;