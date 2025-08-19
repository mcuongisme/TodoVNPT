import { gql } from "@apollo/client";

export const NEW_NOTIFICATION = gql`
  subscription NewNotification($user_id: ID!) {
    newNotification(user_id: $user_id) {
      id
      message
      is_read 
      created_at
    }
  }
`;