import { useQuery } from '@apollo/client';
import { GET_LIST_PROJECT } from '../graphql/queries/projectQueries';

export const useGetProjects = () => {
    const { loading, error, data } = useQuery(GET_LIST_PROJECT);
    return {
        data: data?.getListProject || [],
        loading,
        error,
    };
};
