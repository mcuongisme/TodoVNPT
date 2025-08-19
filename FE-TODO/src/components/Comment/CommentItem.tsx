import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

interface CommentItemProps {
    comment: {
        id: string;
        content: string;
        author: {
            firstName: string;
            lastName: string;
            avatar?: string;
        };
        created_at: string;
    };
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, onEdit, onDelete }) => {
    const menu = (
        <Menu>
            <Menu.Item key="edit" onClick={() => onEdit?.(comment.id)}>
                Sửa
            </Menu.Item>
            <Menu.Item key="delete" danger onClick={() => onDelete?.(comment.id)}>
                Xóa
            </Menu.Item>
        </Menu>
    );

    return (
        <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            {/* <Avatar src={comment.author.avatar} style={{ marginRight: 8 }}>
                {comment.author.fullName[0]}
            </Avatar> */}
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{comment.author.firstName} {comment.author.lastName} <span style={{ color: '#888', marginLeft: 8 }}>{new Date(comment.created_at).toLocaleTimeString()}</span></div>
                <div style={{ marginTop: 4 }}>{comment.content}</div>
            </div>
            <Dropdown overlay={menu} trigger={['click']}>
                <MoreOutlined style={{ cursor: 'pointer', marginLeft: 8 }} />
            </Dropdown>
        </div>
    );
};
