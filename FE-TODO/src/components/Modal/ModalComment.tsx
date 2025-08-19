import React, { useState } from 'react';
import { Modal, Tabs, Input, Button, Avatar, Upload, message } from 'antd';
import { PaperClipOutlined, AudioOutlined, SmileOutlined, SendOutlined } from '@ant-design/icons';
import { useComment, useCommentRealtime } from '../../hooks/useComment';
import { CommentList } from '../Comment/CommentList';

const { TextArea } = Input;

interface ModalCommentProps {
    open: boolean;
    onClose: () => void;
    taskId: string;
    taskTitle: string
}

const ModalComment: React.FC<ModalCommentProps> = ({ open, onClose, taskId, taskTitle }) => {
    const [comment, setComment] = useState('');
    const { handleComment, loading, error } = useComment();

    const handleSubmit = async () => {
        if (!comment.trim()) {
            message.warning('Vui lòng nhập bình luận');
            return;
        }

        try {
            await handleComment({
                content: comment,
                taskId,
                parentId: null,
            });
            message.success('Gửi bình luận thành công');
            setComment('');
        } catch (err) {
            message.error('Gửi bình luận thất bại');
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={600}
            title={taskTitle}
        >
            {/* <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p style={{ color: '#999' }}>
                    Centralize your project’s high-level discussions in project comments.
                </p>
            </div> */}
            <CommentList taskId={taskId} />

            <div
                style={{
                    borderTop: '1px solid #eee',
                    paddingTop: 20,
                }}
            >
                <TextArea
                    placeholder="Comment"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Upload showUploadList={false}>
                            <PaperClipOutlined style={{ fontSize: 18, marginRight: 12, cursor: 'pointer' }} />
                        </Upload>
                        <AudioOutlined style={{ fontSize: 18, marginRight: 12, cursor: 'pointer' }} />
                        <SmileOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
                    </div>
                    <Button type="primary" onClick={handleSubmit} loading={loading}>
                        Gửi <SendOutlined style={{ marginLeft: 8 }} />
                    </Button>
                </div>
            </div>

        </Modal>
    );
};

export default ModalComment;
