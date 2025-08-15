import { gql } from "@apollo/client";


export const CREATE_TASK = gql`
    mutation createTask($task: TaskInput!) {
        createTask(task: $task) {
            title
            note
            priority
            due_date
            created_by
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation updateTask($id: ID!, $task: TaskInput!) {
        updateTask(id: $id, task: $task)
    }
`;

export const UPDATE_TASK_COMPLETED = gql`
    mutation updateTaskCompleted($id: ID!, $completed: Boolean!) {
        updateTaskCompleted(id: $id, completed: $completed) {
            id
            completed
        }
    }
`;