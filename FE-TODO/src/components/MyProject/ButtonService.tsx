import { ShareAltOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client';
import { Button, Modal, Space } from 'antd'
import { GENERATE_INVITE_LINK } from '../../graphql/mutations/projectMutations';
import { useNotificationContext } from '../Common/NotificationProvider';

export const ButtonService = ({ projectId }: { projectId: string }) => {
    const [generateLink] = useMutation(GENERATE_INVITE_LINK);
    const { showNotification } = useNotificationContext();
    const handleGenerateLink = async () => {
        try {
            const res = await generateLink({ variables: { projectId } });
            const link = res.data.generateProjectInviteLink;
            await navigator.clipboard.writeText(link); // copy link
            showNotification("Sao chép link chia sẻ dự án thành công", "Link dự án đã được lưu vào bộ nhớ !", "success")
        } catch (err: any) {
            showNotification("Sao chép link chia sẻ dự án thất bại", err, "error")
        }
    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
        }}>
            <Space>
                <Button
                    icon={<ShareAltOutlined />}
                    onClick={handleGenerateLink}
                    danger
                    type='default'
                >
                    Chia sẻ
                </Button>
            </Space>

        </div>
    )
}
