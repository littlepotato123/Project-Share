import { ApolloServer } from 'apollo-server';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const server = new ApolloServer({ resolvers, typeDefs, playground: true });

server.listen()
    .then(({ url }) => console.log(`Server started on ${url}`))
    .catch((e) => console.log(e));