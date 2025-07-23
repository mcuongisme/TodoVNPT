import React from 'react'
import { Empty, Flex, Spin } from "antd";
import {
    LoadingOutlined,
} from "@ant-design/icons";
export const LoadData = ({ loading, error }: { loading: any, error: any }) => {
    if (loading)
        return (
            <Flex align="center" gap="middle" >
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </Flex>
        )
    if (error) return <Empty description="Đã có lỗi xảy ra" />;
}
