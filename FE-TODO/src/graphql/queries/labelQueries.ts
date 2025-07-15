import { gql } from "@apollo/client";

export const GET_LIST_LABEL = gql`
  query getListLabel {
    getListLabel {
      id
      name
      color
    }
  }
`;