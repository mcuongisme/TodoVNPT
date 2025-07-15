import { resolversLabel } from "./label.resolver";
import { resolversNotification } from "./notification.resolver";
import { resolversTask } from "./task.resolver";

export const resolvers = [
    resolversTask,
    resolversLabel,
    resolversNotification
]