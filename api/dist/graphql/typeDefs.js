"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
    type Query {
        hello: String!
    }
`;
//# sourceMappingURL=typeDefs.js.map