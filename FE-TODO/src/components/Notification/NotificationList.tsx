import { useQuery } from '@apollo/client';
import { Card, Space, Typography } from 'antd';
import { GET_LIST_NOTIFICATION } from '../../graphql/queries/notificationQueries';
import { LoadData } from '../Common/LoadData';
const { Text } = Typography;

export const NotificationList = () => {
    const { loading, error, data } = useQuery(GET_LIST_NOTIFICATION)
    if (loading || error) return <LoadData loading={loading} error={error} />;
    return (
        <>
            {
                data.getListNotification.map((notification: any) => (
                    <Card
                        key={notification.id}
                        style={{
                            backgroundColor: notification.is_read ? '#f0f0f0' : '#fff',
                            borderRadius: 10,
                            padding: '10px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 12,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Space align="start">
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    backgroundColor: '#e75b3f',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 2,
                                }}
                            >
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                    }}
                                />
                            </div>

                            <div>
                                <Text>
                                    {notification.message}
                                </Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {notification.created_at}
                                </Text>
                            </div>
                        </Space>
                    </Card>
                ))
            }
        </>
    )
}
