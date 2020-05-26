const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

// Definition of GraphQL Schema
// Defining a query, that takes in one parameter of "info" which has the type String
// The exclamation mark indicates that, that field is required to make the query
// const typeDefs = `
// type Query{
//   info: String!,
//   feed: [Link!]!
// },
// type Mutation{
//   post(url: String!, description: String!): Link!
// },
// type Link{
//   id: ID!,
//   description: String!,
//   url:String!
// }
// `;

// DS to store all links at run-time

// Resolvers = an actual implementation of the schema defined above
// Structure is similar to the query, as in it takes a parameter called info, which is a string
const resolvers = {
  Query: {
    info: () => `Vikas Shukla`,
    feed: (parent, args, context) => {
      return context.prisma.links();
    }
    // link: (parent, { id }) => {
    //   for (let i = 0; i < links.length; i++) {
    //     if (links[i].id === id) {
    //       return links[i];
    //     }
    //   }
    //   return { id: 'none', description: 'none', url: 'none' };
    // }
  },
  Mutation: {
    post: (parent, { url, description }, context) => {
      return context.prisma.createLink({
        url,
        description
      });
    }
    // updateLink: (parent, { id, url, description }) => {
    //   for (let i = 0; i < links.length; i++) {
    //     if (links[i].id === id) {
    //       if (url) {
    //         links[i].url = url;
    //       }
    //       if (description) {
    //         links[i].description = description;
    //       }
    //       return links[i];
    //     }
    //   }
    // },
    // deleteLink: (parent, { id }) => {
    //   let deleteIndex = -1;
    //   for (let i = 0; i < links.length; i++) {
    //     if (links[i].id === id) {
    //       deleteIndex = i;
    //       break;
    //     }
    //   }
    //   if (deleteIndex >= 0) {
    //     links.splice(deleteIndex, 1);
    //   }
    //   // return links;
    // }
  }

  // Not necessary graphql implies these resolvers automatically
  // Link: {
  //   id: parent => parent.id,
  //   description: parent => parent.description,
  //   url: parent => parent.url
  // }
};

// Bundles the typeDefs and resolvers into a GraphQLServer which is from the graph-ql yoga package
// This tells the server, what api operations are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});

server.start(() => {
  console.log(`The server is running on localhost 4000`);
});
