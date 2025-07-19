import { useQuery } from '@apollo/client';
import { GET_LIST_LABEL } from '../graphql/queries/labelQueries';

export const useLabels = () => {
    const { loading, error, data } = useQuery(GET_LIST_LABEL);
    return {
        labels: data?.getListLabel || [],
        loading,
        error,
    };
};
