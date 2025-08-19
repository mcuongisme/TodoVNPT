import { Notification } from "../model/notification.model";
import { PubSub } from 'graphql-subscriptions';
import { getUserIdFromToken } from "../utils/auth";

export const resolversNotification = {
    Query: {
        getListNotification: async (_: any, args: any) => {
            const notifications = await Notification.find({
                deleted: false
            }).sort({ created_at: -1 });
            return notifications;
        },
    },
    Subcription: {
        newNotification: {
            subscribe: (_: any, { user_id }: { user_id: any }, { pubsub }: { pubsub: PubSub }) => {
                pubsub.asyncIterableIterator(`NOTIFICATION_${user_id}`)
            }
        }
    },
    Mutation: {
        createNotification: async (_: any, args: { message: string, project_id?: string }, context: any) => {
            try {
                const userId = getUserIdFromToken(context.req);
                if (!userId) {
                    throw new Error("Unauthorized");
                }
                const newNotification = new Notification({
                    user_id: userId,
                    project_id: args.project_id || null,
                    message: args.message,

                });

                await newNotification.save();

                return newNotification;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to create notification");
            }
        }
    }
}