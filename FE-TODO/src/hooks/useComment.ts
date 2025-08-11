import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { CREATE_COMMENT } from '../graphql/mutations/commentMutations';
import { useState } from 'react';
import { GET_LIST_COMMENT } from '../graphql/queries/commentQueries';
import { COMMENT_ADDED } from '../graphql/subscription/commentSubcriptions';

export const useComment = () => {
    const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);
    const handleComment = async ({
        content,
        taskId,
        parentId = null,
    }: {
        content: string;
        taskId: string;
        parentId?: string | null;
    }) => {
        if (!content.trim()) return;

        try {
            const { data } = await createComment({
                variables: {
                    input: {
                        content,
                        taskId: taskId,
                        parentId: parentId,
                    },
                },
            });

            console.log('Gửi bình luận thành công:', data);
            return data;
        } catch (err) {
            console.error('Lỗi gửi bình luận:', err);
            throw err;
        }
    };

    return { handleComment, loading, error };
};


export const useGetListComment = (taskId: string) => {
    const { data, loading, error } = useQuery(GET_LIST_COMMENT, {
        variables: { taskId },
        skip: !taskId,
    });

    return {
        comments: data?.getListComment || [],
        loading,
        error,
    };
};

export const useCommentRealtime = (taskId: string) => {
    const { data } = useSubscription(COMMENT_ADDED, {
        variables: { taskId },
    });

    return {
        commentrt: data?.commentAdded || [],
    };
}