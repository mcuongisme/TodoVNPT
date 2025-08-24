import { gql } from 'apollo-server-express';

export const typeDefsComment = gql`
    type User {
        id: ID
        email: String
        firstName: String
        lastName: String
        created_at: String}
    type Comment {
        id: ID!
        content: String!
        task: Task!
        author: User
        project:ID
        parent: Comment
        created_at: String!
        updated_at: String!
        deleted: Boolean
    }

    input CreateCommentInput {
        content: String!
        taskId: ID
        parentId: ID

    }
    type Query {
        getListComment(taskId: ID!): [Comment]
    }

    type Mutation {
        createComment(input: CreateCommentInput!): Comment
    }
    type Subscription {
        commentAdded(taskId: ID!): Comment
    }
`


