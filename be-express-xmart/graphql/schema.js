const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const RootQuery = require('./queries/index');
const RootMutation = require('./mutation/index');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
      name: "Query",
      fields: RootQuery,
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: RootMutation,
    }),
});

module.exports = schema;