import { gql } from "@apollo/client";


export const CREATE_NOTIFICATION = gql`
    mutation CreateNotification($message: String!, $project_id: String) {
        createNotification(message: $message, project_id: $project_id) {
            id
            message
            project_id
            user_id
            is_read
            created_at
        }
    }
`;