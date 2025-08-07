import React, { useState } from 'react';
import { Modal, Tabs, Input, Button, Avatar, Upload, message } from 'antd';
import { PaperClipOutlined, AudioOutlined, SmileOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

interface ModalCommentProps {
    open: boolean;
    onClose: () => void;
}

const ModalComment: React.FC<ModalCommentProps> = ({ open, onClose }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        if (!comment.trim()) {
            message.warning('Vui lòng nhập bình luận');
            return;
        }

        console.log('Bình luận:', comment);
        setComment('');
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p style={{ color: '#999' }}>
                    Centralize your project’s high-level discussions in project comments.
                </p>
            </div>

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

                    <Button type="primary" onClick={handleSubmit}>
                        Comment
                    </Button>
                </div>
            </div>

        </Modal>
    );
};

export default ModalComment;
