import React from 'react';
import { CommentItem } from './CommentItem';
import { useCommentRealtime, useGetListComment } from '../../hooks/useComment';

export const CommentList = ({ taskId }: { taskId: string }) => {
    const { comments, loading, error } = useGetListComment(taskId);
    const { commentrt } = useCommentRealtime(taskId);

    const allComments = React.useMemo(() => {
        if (!commentrt) return comments;
        if (Array.isArray(commentrt)) {
            return [...comments, ...commentrt];
        }
        return [...comments, commentrt];
    }, [comments, commentrt]);

    return (
        <div>
            {allComments.map((comment: any) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                />
            ))}
        </div>
    );
};