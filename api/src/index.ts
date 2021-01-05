import { ApolloServer } from 'apollo-server';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { HelloWorldResolver } from "./resolvers/HelloWorldResolvers";

(async () => {
    await createConnection();

    const server = new ApolloServer({
        playground: true,
        schema: await buildSchema({
            resolvers: [HelloWorldResolver]
        }),
        context: ({ req, res}) => ({ req, res })
    });

    server.listen()
        .then(({ url }) => {
            console.log(`Server started at ${url}`)
        })
        .catch(e => console.log(e));
})();