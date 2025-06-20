import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
    type Query {
        greeting: String
    }

`;

const resolvers = {
  Query: {
    greeting: () => `Hello world`,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const info = await startStandaloneServer(server, { listen: { port: 8000 } });
console.log(`Server running at ${info.url}`);

