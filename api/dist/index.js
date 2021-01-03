"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./graphql/resolvers");
const typeDefs_1 = require("./graphql/typeDefs");
const server = new apollo_server_1.ApolloServer({
    playground: true,
    resolvers: resolvers_1.resolvers,
    typeDefs: typeDefs_1.typeDefs
});
server.listen()
    .then(({ url }) => {
    console.log(`Server started at ${url}`);
})
    .catch((e) => console.log(e));
//# sourceMappingURL=index.js.map