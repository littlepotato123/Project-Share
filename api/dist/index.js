"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const HelloWorldResolvers_1 = require("./resolvers/HelloWorldResolvers");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    const server = new apollo_server_1.ApolloServer({
        playground: true,
        schema: yield type_graphql_1.buildSchema({
            resolvers: [HelloWorldResolvers_1.HelloWorldResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });
    server.listen()
        .then(({ url }) => {
        console.log(`Server started at ${url}`);
    })
        .catch(e => console.log(e));
}))();
//# sourceMappingURL=index.js.map