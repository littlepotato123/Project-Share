import { ApolloServer } from 'apollo-server';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { AuthResolver } from './resolvers/AuthResolvers';

// Reference: https://github.com/benawad/typescript-graphql-crud-example

(async () => {
    await createConnection()
        .then(() => console.log('Connected to Database'))
        .catch(e => console.log(e))

    const server = new ApolloServer({
        playground: true,
        schema: await buildSchema({
            resolvers: [AuthResolver]
        }),
        context: ({ req, res}) => ({ req, res })
    });

    server.listen()
        .then(({ url }) => {
            console.log(`Server started at ${url}`)
        })
        .catch(e => console.log(e));
})();