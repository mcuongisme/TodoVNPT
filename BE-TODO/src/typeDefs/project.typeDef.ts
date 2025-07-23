import { gql } from 'apollo-server-express';

export const typeDefsProject = gql`
    type Project {
        id: ID,
        name: String,
        description: String,
    }
    type Query {
        getListProject: [Project],
    }
`;