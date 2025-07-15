// graphql/queries/taskQueries.js
import { gql } from '@apollo/client';

export const GET_LIST_TASK = gql`
  query getListTask(
    $sortKey: String
    $sortValue: String
    $currentPage: Int
    $limitItem: Int
  ) {
    getListTask(
      sortKey: $sortKey
      sortValue: $sortValue
      currentPage: $currentPage
      limitItem: $limitItem
    ) {
      id
      title
      note
      due_date
      completed
      createdAt
    }
  }
`;
