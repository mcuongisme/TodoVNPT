import { gql } from 'apollo-server-express';

export const typeDefsNotification = gql`
    type Notification {
        id: ID ,
        message: String,
        is_read: Boolean,
        project_id: String,
        created_at: String,
    }
    type Query {
        getListNotification: [Notification],
    }
    type Mutation {
        createNotification(message: String, project_id: String): Notification,
    }
    type Subscription {
        newNotification(user_id: ID!): Notification
    }
`;