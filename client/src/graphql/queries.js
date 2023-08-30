import { gql } from "@apollo/client";

export const QUERY_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      _id
      email
      firstName
      lastName
      isChoreBuddy
      balance
    }
  }
`;

export const QUERY_UNASSIGNED_CHORES = gql`
  query unassignedChores {
    unassignedChores {
      _id
      title
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
      isComplete
      rewardAmount
      title
    }
  }
`;
export const QUERY_CHILDREN_IN_FAMILY = gql`
  query getChildrenInFamily {
    getChildrenInFamily {
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
  query getAllChildrenChores {
    getAllChildrenChores {
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