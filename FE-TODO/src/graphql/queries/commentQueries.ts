import { gql } from "@apollo/client";

export const GET_LIST_COMMENT = gql`
  query getListComment($taskId: ID!) {
    getListComment(taskId: $taskId) {
      id
      content
      created_at
      author {
        id
        lastName
        firstName
      }
      parent {
        id
        content
      }
    }
  }
`;