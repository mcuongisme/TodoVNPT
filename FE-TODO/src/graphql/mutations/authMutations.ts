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

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      access_token
    }
  }
`;

export const CHANGE_INFO_MUTATION = gql`
  mutation changeInfo($firstName: String!, $lastName: String!) {
    changeInfo(firstName: $firstName, lastName: $lastName) {
      id
      email
      firstName
      lastName
    }
  }
`;