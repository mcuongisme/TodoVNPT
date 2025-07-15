import { Express, Application } from 'express';
import express from 'express';
// import routes from './routes';
import { connect } from './config/connectDB';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs/index.typeDef';
import { resolvers } from './resolvers/index.resolver';
import cors from 'cors';
connect();

const startServer = async () => {
    dotenv.config();

    const app = express() as any;
    // app.use(express.json());
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.urlencoded({ extended: true }));

    // routes(app);

    const port = process.env.PORT || 6969

    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        path: '/graphql'
    })

    app.listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
    })

}
startServer()