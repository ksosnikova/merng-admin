const typeDefs = require('./TypeDefs');
const rootResolvers = require('../resolvers/index');
const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: rootResolvers
});

