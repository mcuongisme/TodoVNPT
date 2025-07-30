import React, { useState } from 'react'
import type { ModalProps } from '../../types'
import { Button, ColorPicker, Divider, Input, Modal, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea';
export const ModalAddLabel: React.FC<ModalProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState("");
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
                    defaultValue="#1677ff"
                    showText={(color) => <span>{color.toHexString()}</span>}
                />
            </div>

            <Divider size="small" />

            <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    type="primary"
                    style={{ backgroundColor: "#a81f00", borderColor: "#a81f00" }}
                >
                    Thêm bộ lọc
                </Button>
            </Space>
        </Modal>
    )
}
