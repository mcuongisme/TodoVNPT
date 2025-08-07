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

export const GENERATE_INVITE_LINK = gql`
  mutation GenerateInviteLink($projectId: ID!) {
    generateProjectInviteLink(projectId: $projectId)
  }
`;

export const JOIN_PROJECT = gql`
  mutation joinProject($token: String!) {
    joinProject(token: $token) {
      id
      name
    }
  }
`;