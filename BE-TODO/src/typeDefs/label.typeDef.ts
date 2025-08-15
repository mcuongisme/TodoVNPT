import { gql } from 'apollo-server-express';

export const typeDefsLabel = gql`
    type Label {
        id: ID ,
        name: String,
        color: String,
        createdAt: String,
    }
    type Task {
        id: ID
        title: String
        note: String
    }    
    type TaskLabel {
        id: ID
        label_id: ID
        task_id: ID
        deleted: Boolean
        task: Task
    }
    type Query {
        getListLabel: [Label],
        getListTaskLabel(labelId: String!): [Task]
        labelName(labelId: String!): String
    }
    input LabelInput {
        name: String,
        color: String,
    }
    type Mutation {
        createLabel(label: LabelInput): Label,
        updateLabel(id: ID!, label: LabelInput): Label,
        deleteLabel(id: ID!): Boolean,
        addTaskToLabel(labelId: ID!, taskId: ID!): TaskLabel,
        removeTaskFromLabel(labelId: ID!, taskId: ID!): Boolean
    }
`;