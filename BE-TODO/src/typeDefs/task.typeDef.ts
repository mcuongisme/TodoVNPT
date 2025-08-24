import { gql } from 'apollo-server-express';

export const typeDefsTask = gql`

    type Task {
        id: ID ,
        title: String,
        note: String,
        priority: String,
        due_date: String,
        project_id: String,
        completed: Boolean,
        created_by: String
        }
    type Query {
        getListTask(
            sortKey: String, 
            sortValue: String,
            currentPage: Int = 1,
            limitItem: Int = 1,
            dateFilter: String
            ): [Task],
        getListTaskCompleted(sortKey: String, 
            sortValue: String,
            currentPage: Int = 1,
            limitItem: Int = 1,
            ): [Task]    
        getTask(id: ID): Task,  
    }

    input TaskInput {
        title: String
        note: String,
        priority: String,
        due_date: String,
        project_id: String,
        created_by: String,
        labelIds:[String]
    }

    type Mutation {
        createTask(task: TaskInput) : Task,
        deleteTask(id:ID): String,
        updateTask(id:ID, task: TaskInput): String,
        updateTaskCompleted(id: ID!, completed: Boolean!): Task
    }
`

