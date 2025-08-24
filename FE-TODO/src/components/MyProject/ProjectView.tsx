import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'
import AddTaskModal from '../Modal/ModalAddTask'
import { ProjectTaskList } from './ProjectTaskList'

export const ProjectView = () => {
    const [modalOpen, setModalOpen] = useState(false)


    return (
        <div style={{ padding: 24 }}>
            <ProjectTaskList />
            <Button
                type="link"
                danger
                icon={<PlusOutlined />}
                onClick={() => setModalOpen(true)}
            >
                Thêm yêu cầu
            </Button>
            <AddTaskModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    )
}
