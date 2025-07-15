import { gql } from '@apollo/client';
export const GET_LIST_NOTIFICATION = gql`
  query getListNotification {
    getListNotification {
      id
      message
      created_at
      is_read
    }
  }
`;