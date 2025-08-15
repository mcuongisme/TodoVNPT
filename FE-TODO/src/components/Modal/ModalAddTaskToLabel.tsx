import React, { useState } from "react";
import { Modal, Select, Button, Space, Typography, message } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { useAddTaskToLabel, useLabels } from "../../hooks/useLabels";
import { useNotificationContext } from "../Common/NotificationProvider";

export const ModalAddTaskToLabel = ({ open, onClose, onSave, taskId }: any) => {
    const [selectedLabel, setSelectedLabel] = useState<string>("");

    const { labels } = useLabels();
    const { handleAddTaskToLabel } = useAddTaskToLabel();
    const { showNotification } = useNotificationContext();
    const handleSave = async () => {
        if (!selectedLabel.length) {
            showNotification("Vui lòng chọn ít nhất 1 nhãn", "Bạn cần chọn nhãn để thêm task", "warning");
            return;
        }
        try {
            await handleAddTaskToLabel(selectedLabel, taskId); // Gọi mutation
            showNotification("Thêm task vào nhãn thành công", "Task đã được thêm vào nhãn", "success");
            onClose();
        } catch (err) {
            showNotification("Lỗi", "Có lỗi khi thêm task vào nhãn, vui lòng thử lại", "error");
            console.error("Error adding task to label:", err);
        }
    };

    return (
        <Modal
            title={
                <Space>
                    <TagOutlined />
                    <Typography.Text strong>Thêm task vào nhãn</Typography.Text>
                </Space>
            }
            open={open}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <Space direction="vertical" style={{ width: "100%" }}>
                <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Chọn nhãn"
                    value={selectedLabel}
                    onChange={setSelectedLabel}
                    options={labels.map((label: any) => ({
                        value: label.id,
                        label: label.name
                    }))}
                />
                <Space style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={handleSave}>
                        Lưu
                    </Button>
                </Space>
            </Space>
        </Modal>
    );
};
