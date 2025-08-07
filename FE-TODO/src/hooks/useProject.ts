import { useMutation, useQuery } from '@apollo/client';
import { GET_LIST_PROJECT, GET_PROJECT } from '../graphql/queries/projectQueries';
import { CREATE_PROJECT } from '../graphql/mutations/projectMutations';

export const useGetProjects = () => {
    const { loading, error, data } = useQuery(GET_LIST_PROJECT);
    return {
        data: data?.getListProject || [],
        loading,
        error,
    };
};

export const useGetProject = (id: string) => {
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: {
            id: id,
        },
    });
    return {
        data: data?.getProject || [],
        loading,
        error,
    }
}
export const useCreateProject = () => {
    const [createProject, { loading, error }] = useMutation(CREATE_PROJECT,
        {
            refetchQueries: [
                {
                    query: GET_LIST_PROJECT,
                }
            ],
            awaitRefetchQueries: true // đợi query load xong rồi mới resolve
        })

    const handleCreateProject = async (project: any) => {
        try {
            const { data } = await createProject({
                variables: { project }
            });
            return data.createProject;
        } catch (err) {
            console.error("Error creating project:", err);
            throw err;
        }
    };

    return { handleCreateProject, loading, error };

};