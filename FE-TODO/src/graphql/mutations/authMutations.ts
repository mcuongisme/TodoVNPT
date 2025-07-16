// graphql/mutations.ts
import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
      user {
        id
        email
        name
      }
    }
  }
`;
