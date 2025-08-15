import { gql } from "@apollo/client";

export const CREATE_LABEL = gql`
    mutation createLabel($label: LabelInput!) {
        createLabel(label: $label) {
        id
        name
        color
        }
    }
`;

export const ADD_TASK_TO_LABEL = gql`
    mutation addTaskToLabel($labelId: ID!, $taskId: ID!) {
        addTaskToLabel(labelId: $labelId, taskId: $taskId) {
            id
            label_id
            task_id
            deleted
            task {
                id
                title
                note
            } 
        }
    }
`;