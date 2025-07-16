import { Express, Application, Response, Request } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
// import routes from './routes';
import { connect } from './config/connectDB';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs/index.typeDef';
import { resolvers } from './resolvers/index.resolver';
import cors from 'cors';
connect();
export const secretkey = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
export const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret_key';
const startServer = async () => {
    dotenv.config();

    const app = express() as any;
    // app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true, // Allow cookies to be sent with requests
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // routes(app);

    const port = process.env.PORT || 6969

    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        context: ({ req, res }: { req: Request, res: Response }) => ({ req, res }),
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        cors: false,
        path: '/graphql'
    })

    app.listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
    })

}
startServer()