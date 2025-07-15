import { gql } from 'apollo-server-express';

export const typeDefsLabel = gql`
    type Label {
        id: ID ,
        name: String,
        color: String,
        createdAt: String,
    }
    type Query {
        getListLabel: [Label],
    }
`;