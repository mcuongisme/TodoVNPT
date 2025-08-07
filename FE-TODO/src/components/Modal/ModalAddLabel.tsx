import React, { useState } from 'react'
import type { ModalProps } from '../../types'
import { Button, ColorPicker, Divider, Input, message, Modal, Space } from 'antd'
import { useCreateLabel } from '../../hooks/useLabels';
import { useNotificationContext } from '../Common/NotificationProvider';
export const ModalAddLabel: React.FC<ModalProps> = ({ open, onClose }) => {
    const { showNotification } = useNotificationContext();
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#1677ff");
    const { handleCreateLabel, loading, error } = useCreateLabel();
    const handleSubmit = async () => {
        if (!title.trim()) {
            message.error("Please enter a task title.");
            return;
        }
        const labelData = {
            name: title.trim(),
            color: color,
        };
        try {
            await handleCreateLabel(labelData);
            showNotification("Thêm nhãn thành công", "Nhãn đã được thêm vào danh sách", "success");
            setTitle("");
            setColor("#1677ff");
            onClose();
        } catch (err) {
            showNotification("Thêm nhãn thất bại", error?.message, "error");
        }
    }
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closable={false}
            width={500}
            style={{ top: 100 }}
            title="Thêm nhãn mới"
        >
            <Divider size='small' />
            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                    Tiêu đề bộ lọc
                </label>
                <Input
                    placeholder="Nhập tiêu đề"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                    Màu
                </label>
                <ColorPicker
                    defaultValue={color}
                    value={color}
                    onChange={(color) => setColor(color.toHexString())}
                    showText={(color) => <span>{color.toHexString()}</span>}
                />
            </div>

            <Divider size="small" />

            <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    type="primary"
                    style={{ backgroundColor: "#a81f00", borderColor: "#a81f00" }}
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Thêm bộ lọc
                </Button>
            </Space>
        </Modal>
    )
}
