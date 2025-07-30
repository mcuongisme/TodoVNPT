import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
    mutation createProject($project: ProjectInput!) {
        createProject(project: $project) {
        id
        name
        description
        }
    }
`;