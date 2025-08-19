// graphql/queries/taskQueries.js
import { gql } from '@apollo/client';

export const GET_LIST_TASK = gql`
  query getListTask(
    $sortKey: String
    $sortValue: String
    $currentPage: Int
    $limitItem: Int
    $dateFilter: String
  ) {
    getListTask(
      sortKey: $sortKey
      sortValue: $sortValue
      currentPage: $currentPage
      limitItem: $limitItem
      dateFilter: $dateFilter
    ) {
      id
      title
      note
      due_date
      completed
    }
  }
`;


export const GET_LIST_TASK_COMPLETED = gql`
  query getListTaskCompleted(
    $sortKey: String
    $sortValue: String
    $currentPage: Int
    $limitItem: Int
  ) {
    getListTaskCompleted(
      sortKey: $sortKey
      sortValue: $sortValue
      currentPage: $currentPage
      limitItem: $limitItem
    ) {
      id
      title
      completed
    }
  }
`;
