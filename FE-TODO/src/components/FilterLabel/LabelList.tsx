import React from 'react'
import type { LabelItem } from '../../types';
import { Collapse, Typography, Tooltip, Divider, Flex, Spin } from "antd";
import {
    TagOutlined,

} from "@ant-design/icons";
import { GET_LIST_LABEL } from '../../graphql/queries/labelQueries';
import { useQuery } from '@apollo/client';
import { LoadData } from '../Common/LoadData';
export const LabelList = () => {
    const { loading, error, data } = useQuery(GET_LIST_LABEL);
    if (loading || error) return <LoadData loading={loading} error={error} />;
    return (
        <div>
            {data.getListLabel.map((label: any) => (
                <>
                    <div
                        key={label.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "5px 20px",
                            gap: 8,

                        }}
                    >
                        <TagOutlined style={{ color: label.color }} />
                        <span>{label.name}</span>
                    </div>
                    <Divider size='small' />
                </>

            ))}
        </div>
    )
}
