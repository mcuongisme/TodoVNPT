import { gql } from "@apollo/client";

export const COMMENT_ADDED = gql`
  subscription OnCommentAdded($taskId: ID!) {
    commentAdded(taskId: $taskId) {
      id
      content
      author {
        id 
        firstName
        lastName
      }
    }
  }
`;