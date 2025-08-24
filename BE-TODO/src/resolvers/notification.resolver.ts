import { Notification } from "../model/notification.model";
import { PubSub } from 'graphql-subscriptions';
import { getUserIdFromToken } from "../utils/auth";

export const resolversNotification = {
    Query: {
        getListNotification: async (_: any, args: any, context: any) => {
            const userId = getUserIdFromToken(context.req);
            if (!userId) {
                throw new Error("Unauthorized");
            }

            const notifications = await Notification.find({
                deleted: false,
                user_id: { $ne: userId }
            }).sort({ created_at: -1 });

            return notifications;
        },
    },
    Subscription: {
        newNotification: {
            subscribe: (_: any, { user_id }: { user_id: string }, { pubsub }: { pubsub: PubSub }) => {
                if (!user_id) throw new Error("user_id is required");
                return pubsub.asyncIterableIterator(`NEW_NOTIFICATION_${user_id}`);
            },
        },
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