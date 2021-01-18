import { ApolloServer } from 'apollo-server';
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

    server.listen()
        .then(({ url }) => {
            console.log(`Server started at ${url}`)
        })
        .catch(e => console.log(e));
})();