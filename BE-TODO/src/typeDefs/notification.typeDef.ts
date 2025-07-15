import { gql } from 'apollo-server-express';

export const typeDefsNotification = gql`
    type Notification {
        id: ID ,
        message: String,
        is_read: Boolean,
        created_at: String,
    }
    type Query {
        getListNotification: [Notification],
    }
`;