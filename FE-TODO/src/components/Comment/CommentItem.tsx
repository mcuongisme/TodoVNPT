import React from 'react';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useGetCurrentUser } from '../../hooks/useAuth';

interface CommentItemProps {
    comment: {
        id: string;
        content: string;
        author: {
            id: string;
            firstName: string;
            lastName: string;
            avatar?: string;
            role?: string;
        };
        created_at: string;
    };
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, onEdit, onDelete }) => {
    const { user } = useGetCurrentUser();

    const isCurrentUser = user?.id === comment.author.id;

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
        <div
            style={{
                display: "flex",
                flexDirection: isCurrentUser ? "row-reverse" : "row",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
                textAlign: isCurrentUser ? "right" : "left",
            }}
        >
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>
                    {["ADMIN", "STAFF"].includes(comment.author.role || "") ? (
                        <div style={{ color: "red" }}>
                            Nhân viên: {comment.author.firstName} {comment.author.lastName}
                        </div>
                    ) : comment.author.role === "CUSTOMER" ? (
                        <div style={{ color: "blue" }}>
                            Khách hàng: {comment.author.firstName} {comment.author.lastName}
                        </div>
                    ) : (
                        <div style={{ color: "black" }}>
                            {comment.author.firstName} {comment.author.lastName}
                        </div>
                    )}
                    <span style={{ color: "#888" }}>
                        {new Date(Number(comment.created_at)).toLocaleString("vi-VN")}
                    </span>
                </div>
                <div style={{ marginTop: 4 }}>{comment.content}</div>
            </div>
            <Dropdown overlay={menu} trigger={["click"]}>
                <MoreOutlined style={{ cursor: "pointer", marginLeft: 8 }} />
            </Dropdown>
        </div>
    );
};
