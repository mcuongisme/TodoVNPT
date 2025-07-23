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