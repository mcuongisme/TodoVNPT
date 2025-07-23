export const accPrefix = '/account';
export const adminPrefix = '/admin';

export const ROUTES = {
    INBOX: '/inbox',
    TODAY: '/today',
    UPCOMING: '/upcoming',
    LABEL_FILTER: '/labels-filters',
    COMPLETED: '/completed',
    NOTIFICATIONS: '/notifications',

    PROJECT: {
        PREFIX: '/project',
        LIST: '/project/list',
        DETAIL: (id: string) => `/project/${id}`,
    },

    ACCOUNT: {
        PREFIX: accPrefix,
        LOGIN: `${accPrefix}/login`,
        REGISTER: `${accPrefix}/register`,
        FORGOT: `${accPrefix}/forgot`,
        PROFILE: `${accPrefix}/profile`,
    }
};
