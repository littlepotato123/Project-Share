import { ApolloServer } from 'apollo-server-express';
import cors from "cors";
import express from 'express';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { AboutPageResolver } from './resolvers/About/AboutPageResolver';
import { CategoryResolver } from './resolvers/Category/CategoryResolver';
import { GetPostResolver } from './resolvers/Post/GetPostResolver';
import { MutationPostResolver } from './resolvers/Post/MutationPostResolver';
import { AuthResolver } from './resolvers/User/AuthResolvers';
import { AwardResolver } from './resolvers/User/AwardResolver';
import { EditUserResolver } from './resolvers/User/EditUserResolver';
import { UserPageResolver } from './resolvers/User/UserPageResolvers';

(async () => {
    const app = express();
    app.use(cors());
    
    app.get('/', (_: any, res) => {
        res.send("Go to <a href='/graphql'>GraphQL</a>")
    })
    
    await createConnection()
        .then(() => console.log('Connected to Database'))
        .catch(e => console.log(e))

    
    const schema = await buildSchema({
        resolvers: [
            AuthResolver, 
            UserPageResolver, 
            EditUserResolver,
            AboutPageResolver,
            AwardResolver,
            GetPostResolver,
            CategoryResolver,
            MutationPostResolver
        ]
    });

    const server = new ApolloServer({
        playground: true,
        schema,
        context: ({ req, res}) => ({ req, res })
    });
    
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}${server.graphqlPath}`);
    });
})();