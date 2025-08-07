import React from 'react';
import { CommentItem } from './CommentItem';
import { useGetListComment } from '../../hooks/useComment';


export const CommentList = ({ taskId }: { taskId: string }) => {
    const { comments, loading, error } = useGetListComment(taskId);

    return (
        <div>
            {comments.map((comment: any) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                // onEdit={onEdit}
                // onDelete={onDelete}
                />
            ))}
        </div>
    );
};
