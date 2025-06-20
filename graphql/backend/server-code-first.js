import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { queryType } from "nexus";
import { makeSchema } from "nexus";

const query = queryType({
  definition: (t) => {
    t.string("greeting", {
        resolve : () => 'Hello world'
    });
  },
});



const schema = makeSchema({ types: [query] });

const server = new ApolloServer({ schema });
const info = await startStandaloneServer(server, { listen: { port: 8000 } });
console.log(`Server running at ${info.url}`);
