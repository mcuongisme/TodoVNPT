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
    input ProjectInput {
        name: String,
        description: String,
    }
    type Mutation {
        createProject(project: ProjectInput): Project,
        updateProject(id: ID!, name: String, description: String): Project,
        deleteProject(id: ID!): Boolean,
    }
`;