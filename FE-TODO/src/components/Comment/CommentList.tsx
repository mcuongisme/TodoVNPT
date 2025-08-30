import React from 'react';
import { CommentItem } from './CommentItem';
import { useCommentRealtime, useGetListComment } from '../../hooks/useComment';

export const CommentList = ({ taskId }: { taskId: string }) => {
    const { comments } = useGetListComment(taskId);
    const { commentrt } = useCommentRealtime(taskId);

    const [realtimeComments, setRealtimeComments] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (commentrt) {
            setRealtimeComments(prev => {
                if (prev.some(c => c.id === commentrt.id)) return prev;
                return [...prev, commentrt];
            });
        }
    }, [commentrt]);

    const allComments = React.useMemo(() => {
        return [...comments, ...realtimeComments];
    }, [comments, realtimeComments]);

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