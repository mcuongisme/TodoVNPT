import { resolversAuth } from "./auth.resolver";
import { resolversLabel } from "./label.resolver";
import { resolversNotification } from "./notification.resolver";
import { resolversTask } from "./task.resolver";
import { resolversProject } from "./project.resolver";
import { resolversComment } from "./comment.resolver";
export const resolvers = [
    resolversTask,
    resolversLabel,
    resolversNotification,
    resolversAuth,
    resolversProject,
    resolversComment
]