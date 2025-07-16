import { gql } from 'apollo-server-express';

export const typeDefsAuth = gql`
    type User {
        id: ID,
        email: String,
        name: String,
        created_at: String}
    type AuthPayload {
        user: User
        access_token: String
        refresh_token: String
    }

    type AccessTokenPayload {
        access_token: String
    }
    type Query {
        getCurrentUser: User,
    }
    type Mutation {
        register(email: String, password: String, name: String): AuthPayload
        login(email: String, password: String): AuthPayload
        refreshToken: AccessTokenPayload
        logout: Boolean
    }
`;