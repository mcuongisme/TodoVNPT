import { gql } from 'apollo-server-express';

export const typeDefsProject = gql`
    type Task {
        id: ID
        title: String
        note: String
    }    
    type Project {
        id: ID,
        name: String,
        description: String,
        tasks: [Task]
    }
    type Query {
        getListProject: [Project],
        getProject(id: ID!): Project
    }
    input ProjectInput {
        name: String,
        description: String,
    }
    type Mutation {
        createProject(project: ProjectInput): Project,
        updateProject(id: ID!, name: String, description: String): Project,
        deleteProject(id: ID!): Boolean,
        generateProjectInviteLink(projectId: ID!): String,
        joinProject(token: String!): Project
    }
`;