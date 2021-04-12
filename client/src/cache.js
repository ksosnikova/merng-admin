import { InMemoryCache, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedIn();
          },
        },
        isAdmin: {
          read() {
            return isAdminVar();
          }
        },
      },
    },
  },
});

export const isLoggedIn = makeVar(!!localStorage.getItem('token'));
export const isAdminVar = makeVar(false);