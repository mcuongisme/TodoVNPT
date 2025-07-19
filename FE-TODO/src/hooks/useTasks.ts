import { useMutation, useQuery } from '@apollo/client';
import { GET_LIST_TASK } from '../graphql/queries/taskQueries';
import { CREATE_TASK } from '../graphql/mutations/taskMutations';


export const useGetTasks = () => {
    const { loading, error, data } = useQuery(GET_LIST_TASK, {
        variables: {
            sortKey: "createdAt",
            sortValue: "desc",
            currentPage: 1,
            limitItem: 10,
        },
    });
    return {
        tasks: data?.getListTask || [],
        loading,
        error,
    };
}

export const useCreateTask = () => {
    const [createTask, { loading, error }] = useMutation(CREATE_TASK);

    const handleCreateTask = async (task: any) => {
        try {
            const { data } = await createTask({
                variables: { task },
            });
            return data.createTask;
        } catch (err) {
            console.error("Error creating task:", err);
            throw err;
        }
    };

    return { handleCreateTask, loading, error };
}
