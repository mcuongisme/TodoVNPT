import { gql } from "@apollo/client";

export const GET_LIST_PROJECT = gql`
  query getListProject {
    getListProject {
      id
      name
      description
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      description
      tasks {
        id
        title
        note
      }
    }
  }
`;