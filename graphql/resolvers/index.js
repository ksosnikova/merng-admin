const authResolver = require('./auth');
const profilesResolver = require('./profiles');
const adminResolver = require('./admin');

const rootResolver = {
  ...profilesResolver,
  Mutation: {
    ...authResolver.Mutation,
    ...profilesResolver.Mutation,
    ...adminResolver.Mutation
  },
  Query: {
    ...profilesResolver.Query,
    ...adminResolver.Query
  }
};

module.exports = rootResolver;