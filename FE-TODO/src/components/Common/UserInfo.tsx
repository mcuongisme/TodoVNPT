import { Avatar, Dropdown, Typography, type MenuProps } from 'antd'
const { Text } = Typography;
import styles from "./Sidebar.module.scss"
import { GET_CURRENT_USER } from '../../graphql/queries/userQueries';
import { useQuery } from '@apollo/client';
import { LoadData } from './LoadData';
import { logout } from '../../utils/auth';
const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a rel="noopener noreferrer" href="/user-info">
                Thông tin cá nhân
            </a>
        )
    },
    {
        key: '2',
        danger: true,
        label: 'Đăng xuất',
        onClick: () => {
            logout();
        }
    },
];
export const UserInfo = () => {
    const { loading, error, data } = useQuery(GET_CURRENT_USER);
    if (loading || error) return <LoadData loading={loading} error={error} />;
    return (
        <Dropdown menu={{ items }}>
            <div className={styles.user_info} >
                <Avatar size={40} icon={<span style={{ fontSize: 18 }}>👤</span>} />
                <div style={{ marginLeft: 12 }}>
                    <div style={{ fontWeight: 600 }}>{data.getCurrentUser.lastName}</div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        @{data.getCurrentUser.email.split('@')[0]}
                    </Text>
                </div>
            </div>
        </Dropdown>

    )
}
