const { GraphQLServer } = require('graphql-yoga');

// Definition of GraphQL Schema
// Defining a query, that takes in one parameter of "info" which has the type String
// The exclamation mark indicates that, that field is required to make the query
const typeDefs = `
type Query{
  name(name:String!): String!
}
`;

// Resolvers = an actual implementation of the schema defined above
// Structure is similar to the query, as in it takes a parameter called info, which is a string
const resolvers = {
  Query: {
    name: name => name
  }
};

// Bundles the typeDefs and resolvers into a GraphQLServer which is from the graph-ql yoga package
// This tells the server, what api operations are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log(`The server is running on localhost 4000`);
});
