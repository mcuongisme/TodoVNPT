import { Express, Application, Response, Request } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connect } from './config/connectDB';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs/index.typeDef';
import { resolvers } from './resolvers/index.resolver';
import cors from 'cors';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

connect();
export const secretkey = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
export const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret_key';
export const pubsub = new PubSub();

const startServer = async () => {
    dotenv.config();

    const app = express() as any;
    const httpServer = createServer(app);

    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: { req: Request, res: Response }) => ({ req, res, pubsub }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: false,
        path: '/graphql'
    });

    const port = process.env.PORT || 6969;

    // Set up WebSocket server for GraphQL subscriptions
    SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
            onConnect: (connectionParams: any, webSocket: any) => {
                console.log('WebSocket connected');
                return { pubsub };
            },
            onDisconnect: () => {
                console.log('WebSocket disconnected');
            }
        },
        {
            server: httpServer,
            path: '/graphql',
        }
    );

    httpServer.listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
        console.log(`GraphQL WebSocket subscriptions available at ws://localhost:${port}/graphql`);
    });
};

startServer();