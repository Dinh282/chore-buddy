import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
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
  query getUnassignedChores($family: ID!, assignee:ID!) {
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
