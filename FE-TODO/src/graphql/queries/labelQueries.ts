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

export const GET_TASK_BY_LABEL = gql`
  query getTasksByLabel($labelId: String!) {
    getListTaskLabel(labelId: $labelId) {
      id
      title
      note
      due_date
      completed
    }
    labelName(labelId: $labelId)
  }
`