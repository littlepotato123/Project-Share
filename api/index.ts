import { ApolloServer } from 'apollo-server';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const server = new ApolloServer({
    playground: true,
    resolvers,
    typeDefs
});

server.listen()
    .then(({ url }) => {
        console.log(`Server started at ${url}`);
    })
    .catch((e) => console.log(e))