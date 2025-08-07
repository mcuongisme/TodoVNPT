import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      content
      parent {
        id
      }
      created_at
    }
  }
`;
