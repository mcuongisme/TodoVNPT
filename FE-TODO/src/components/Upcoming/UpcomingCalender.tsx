import React, { useState } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Alert, Badge, Calendar, Spin } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useGetTasks } from '../../hooks/useTasks';

export const UpcomingCalender: React.FC = () => {
    const { loading, error, tasks } = useGetTasks();

    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());
    console.log(tasks)

    // ✅ Chuyển tasks thành map theo ngày
    const getTasksByDate = (date: Dayjs) => {
        if (!tasks) return [];

        return tasks
            .filter((task: any) =>
                dayjs(Number(task.due_date)).isSame(date, 'day')
            )
            .map((task: any) => ({
                type: task.status || 'success',
                content: task.title || 'No Title'
            }));
    };

    const dateCellRender = (date: Dayjs) => {
        const listData = getTasksByDate(date);
        return (
            <ul className="events">
                {listData.map((item: any, index: any) => (
                    <li key={index}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const monthCellRender = (_: Dayjs) => null; // không cần hiển thị gì theo tháng

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    if (loading) return <Spin />;
    if (error) return <Alert message="Lỗi tải công việc" type="error" />;

    return (
        <>
            <Alert
                message={`Bạn đã chọn: ${selectedValue?.format('DD-MM-YYYY')}`}
                type="info"
                style={{ marginBottom: 20 }}
            />
            <Calendar
                cellRender={cellRender}
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                style={{ padding: 10 }}
            />
        </>
    );
};
