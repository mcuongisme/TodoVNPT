export const accPrefix = '/account';
export const adminPrefix = '/admin';

export const ROUTES = {
    INBOX: '/inbox',
    TODAY: '/today',
    UPCOMING: '/upcoming',
    LABEL_FILTER: '/labels-filters',
    LABEL: (id: string) => `/label/${id}`,
    COMPLETED: '/completed',
    NOTIFICATIONS: '/notifications',

    PROJECT: {
        PREFIX: '/project',
        DETAIL: (id: string) => `/project/${id}`,
        INVITE: 'projects/join/:token'
    },

    ACCOUNT: {
        PREFIX: accPrefix,
        LOGIN: `${accPrefix}/login`,
        REGISTER: `${accPrefix}/register`,
        FORGOT: `${accPrefix}/forgot`,
        PROFILE: `${accPrefix}/profile`,
    }
};
