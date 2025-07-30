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
    input LabelInput {
        name: String,
        color: String,
    }
    type Mutation {
        createLabel(label: LabelInput): Label,
        updateLabel(id: ID!, label: LabelInput): Label,
        deleteLabel(id: ID!): Boolean,
    }
`;