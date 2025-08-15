import { useMutation, useQuery } from '@apollo/client';
import { GET_LIST_LABEL, GET_TASK_BY_LABEL } from '../graphql/queries/labelQueries';
import { ADD_TASK_TO_LABEL, CREATE_LABEL } from '../graphql/mutations/labelMutations';

export const useLabels = () => {
    const { loading, error, data } = useQuery(GET_LIST_LABEL);
    return {
        labels: data?.getListLabel || [],
        loading,
        error,
    };
};

export const useGetTaskByLabel = (labelId: string) => {
    const { loading, error, data } = useQuery(GET_TASK_BY_LABEL, {
        variables: {
            labelId: labelId,
        },
    });
    return {
        tasks: data?.getListTaskLabel || [],
        labelName: data?.labelName || [],
        loading,
        error,
    }
}

export const useCreateLabel = () => {
    const [createLabel, { loading, error }] = useMutation(CREATE_LABEL,
        {
            refetchQueries: [
                {
                    query: GET_LIST_LABEL
                    // variables: { sortKey: "createdAt", sortValue: "desc", currentPage: 1, limitItem: 10 }
                }
            ],
            awaitRefetchQueries: true // đợi query load xong rồi mới resolve
        });

    const handleCreateLabel = async (label: any) => {
        try {
            const { data } = await createLabel({
                variables: { label },
            });
            return data.createLabel;
        } catch (err) {
            console.error("Error creating label:", err);
            throw err;
        }
    };

    return { handleCreateLabel, loading, error };
}

export const useAddTaskToLabel = () => {
    const [addTaskToLabel, { loading, error }] = useMutation(ADD_TASK_TO_LABEL, {
        refetchQueries: [
            {
                query: GET_LIST_LABEL
            }
        ],
        awaitRefetchQueries: true
    });

    const handleAddTaskToLabel = async (labelId: string, taskId: string) => {
        try {
            const { data } = await addTaskToLabel({
                variables: { labelId, taskId },
            });
            return data.addTaskToLabel;
        } catch (err) {
            console.error("Error adding task to label:", err);
            throw err;
        }
    };

    return { handleAddTaskToLabel, loading, error };
};