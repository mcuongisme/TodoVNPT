// graphql/mutations.ts
import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      access_token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($email: String, $password: String, $firstName: String, $lastName: String) {
    register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      access_token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;