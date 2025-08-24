import { useMutation, useSubscription } from "@apollo/client";
import { NEW_NOTIFICATION } from "../graphql/subscription/notificationSubcription";
import { CREATE_NOTIFICATION } from "../graphql/mutations/notificationMutation";

export const useNotificationRealtime = (user_id: string) => {
    const { data } = useSubscription(NEW_NOTIFICATION, {
        variables: { user_id },
    });

    return {
        notificationrt: data?.newNotification ?? null

    };
};

export const useCreateNotification = () => {
    const [createNotification, { loading, error, data }] = useMutation(CREATE_NOTIFICATION);

    const handleCreateNotification = async (message: string, project_id?: string) => {
        try {
            const res = await createNotification({
                variables: { message, project_id },
            });
            return res.data?.createNotification;
        } catch (err) {
            console.error("Lỗi tạo thông báo:", err);
            throw err;
        }
    };

    return { handleCreateNotification, loading, error, data };
};