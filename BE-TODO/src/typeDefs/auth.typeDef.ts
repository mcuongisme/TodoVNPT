import { gql } from 'apollo-server-express';

export const typeDefsAuth = gql`
    type User {
        id: ID
        email: String
        firstName: String
        lastName: String
        created_at: String
        role: String
        avatar:String
    }
    type AuthPayload {
        user: User
        access_token: String
    }

    type AccessTokenPayload {
        access_token: String
    }
    type Query {
        getCurrentUser: User,
    }
    type Mutation {
        register(email: String, password: String, firstName: String, lastName: String): AuthPayload
        registerEmployee(
            email: String!
            password: String!
            firstName: String
            lastName: String
            role: String!     
            avatar: String
        ): AuthPayload
        login(email: String, password: String): AuthPayload
        changePassword(currentPassword: String, newPassword: String): AccessTokenPayload
        changeInfo(firstName: String, lastName: String): User
    }
`;