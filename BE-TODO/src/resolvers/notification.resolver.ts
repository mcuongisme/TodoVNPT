import { Notification } from "../model/notification.model";

export const resolversNotification = {
    Query: {
        getListNotification: async (_: any, args: any) => {
            const notifications = await Notification.find({
                deleted: false
            }).sort({ created_at: -1 });
            return notifications;
        },
    }
}