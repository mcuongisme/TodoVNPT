import { BellOutlined } from '@ant-design/icons'
import { Badge, Button, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { ROUTES } from '../../routes/paths'
import { useGetCurrentUser } from '../../hooks/useAuth';
import { useNotificationRealtime } from '../../hooks/useNotification';

export const ButtonNotification = () => {
    const { user } = useGetCurrentUser()
    const { notificationrt } = useNotificationRealtime(user?.id ?? "");
    const [hasNew, setHasNew] = useState(false);

    useEffect(() => {
        if (notificationrt) {
            setHasNew(true);
        }
    }, [notificationrt]);

    return (
        <Tooltip title="Thông báo">
            <Badge dot={hasNew} offset={[-2, 2]}>
                <Button
                    type="text"
                    icon={
                        <BellOutlined
                            className={hasNew ? "animate-ring text-red-500" : ""}
                        />
                    }
                    href={ROUTES.NOTIFICATIONS}
                    onClick={() => setHasNew(false)}
                />
            </Badge>
        </Tooltip>
    );
};

