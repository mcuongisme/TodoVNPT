import { useMutation, useQuery } from '@apollo/client';
import { GET_LIST_TASK, GET_LIST_TASK_COMPLETED } from '../graphql/queries/taskQueries';
import { CREATE_TASK, UPDATE_TASK, UPDATE_TASK_COMPLETED } from '../graphql/mutations/taskMutations';


export const useGetTasks = (dateFilter: string) => {
    const { loading, error, data } = useQuery(GET_LIST_TASK, {
        variables: {
            sortKey: "createdAt",
            sortValue: "desc",
            currentPage: 1,
            limitItem: 10,
            dateFilter: dateFilter,
        },
    });
    return {
        tasks: data?.getListTask || [],
        loading,
        error,
    };
}


export const useGetTasksCompleted = () => {
    const { loading, error, data } = useQuery(GET_LIST_TASK_COMPLETED, {
        variables: {
            sortKey: "createdAt",
            sortValue: "desc",
            currentPage: 1,
            limitItem: 10,
        },
    });
    return {
        tasks: data?.getListTaskCompleted || [],
        loading,
        error,
    };
}

export const useCreateTask = () => {
    const [createTask, { loading, error }] = useMutation(CREATE_TASK);

    const handleCreateTask = async (task: any, dateFilter: string) => {
        try {
            const { data } = await createTask({
                variables: { task },
                refetchQueries: [
                    {
                        query: GET_LIST_TASK,
                        variables: {
                            sortKey: "createdAt",
                            sortValue: "desc",
                            currentPage: 1,
                            limitItem: 10,
                            dateFilter
                        }
                    }
                ],
                awaitRefetchQueries: true
            });
            return data.createTask;
        } catch (err) {
            console.error("Error creating task:", err);
            throw err;
        }
    };

    return { handleCreateTask, loading, error };
};
export const useUpdateTask = () => {
    const [updateTask, { loading, error }] = useMutation(UPDATE_TASK, {
        refetchQueries: [
            {
                query: GET_LIST_TASK,
                variables: { sortKey: "createdAt", sortValue: "desc", currentPage: 1, limitItem: 10 }
            }
        ],
        awaitRefetchQueries: true
    });
    const handleUpdateTask = async (id: string, task: any) => {
        try {
            const { data } = await updateTask({
                variables: { id, task },
            });
            return data.updateTask;
        } catch (err) {
            console.error("Error updating task:", err);
            throw err;
        }
    };
    return { handleUpdateTask, loading, error };
};

export const useUpdateTaskCompleted = () => {
    const [updateTaskCompleted, { loading, error }] = useMutation(UPDATE_TASK_COMPLETED, {
        refetchQueries: [
            {
                query: GET_LIST_TASK,
                variables: { sortKey: "createdAt", sortValue: "desc", currentPage: 1, limitItem: 10 }
            }
        ],
        awaitRefetchQueries: true
    });

    const handleUpdateTaskCompleted = async (id: string, completed: boolean) => {
        try {
            const { data } = await updateTaskCompleted({
                variables: { id, completed }
            });
            return data.updateTaskCompleted;
        } catch (err) {
            console.error("Error updating task:", err);
            throw err;
        }
    };

    return { handleUpdateTaskCompleted, loading, error };
};