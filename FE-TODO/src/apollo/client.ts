import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    from,
    split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
});

// WebSocket link với connectionParams để gửi token
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3000/graphql',
    options: {
        reconnect: true,
        connectionParams: () => {
            const token = localStorage.getItem('access_token');
            return {
                authorization: token ? `Bearer ${token}` : '',
            };
        },
    },
});

// Xử lý lỗi
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('access_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const splitLink = split(
    ({ query }) => {
        const def = getMainDefinition(query);
        return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
        );
    },
    wsLink,
    from([authLink, httpLink])
);

export const client = new ApolloClient({
    link: from([errorLink, splitLink]),
    cache: new InMemoryCache(),
});