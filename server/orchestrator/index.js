import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs, userResolvers } from "./schema/UserSchema.js";
import { productTypeDefs, productResolvers } from "./schema/ProductSchema.js";

const server = new ApolloServer({
  typeDefs: [userTypeDefs, productTypeDefs],

  resolvers: [userResolvers, productResolvers],

  introspection: true
});

const { url } = await startStandaloneServer(server, {
  listen: { port : 80 },
});

console.log(`🚀  Server ready at: ${url}`);
