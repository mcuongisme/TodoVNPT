import { gql } from 'apollo-server-express';

export const typeDefsComment = gql`
    type Comment {
        id: ID!
        content: String!
        task: Task!
        author: User!
        parent: Comment
        created_at: String!
        updated_at: String!
        deleted: Boolean
    }

    input CreateCommentInput {
        content: String!
        taskId: ID!
        parentId: ID
    }

    type Mutation {
        createComment(input: CreateCommentInput!): Comment
    }
`


