module.exports = `
type Profile {
    id: ID
    userID: String!
    name: String!
    gender: String!
    birthday: String!
    city: String!
  }

  type User {
    id: ID
    email: String!
    token: String
    isAdmin: Boolean
  }

  type Admin {
    users: [User]
    profiles: [Profile]
    }

  type IsAdmin {
    isAdmin: Boolean
  }

  input ProfileInput {
    name: String!
    city: String!
    gender: String!
    birthday: String!
  }

  type Mutation {
    login(email: String!, password: String!): User!
    registration(email: String!, password: String!): User!
    createProfile(profileInput: ProfileInput!): Profile!
    deleteProfile(profileId: ID!): ID
    updateProfile(profileId: ID!, profileInput: ProfileInput!): Profile!
    updateUser(userId: ID!): ID
    deleteUser(userId: ID!): ID
  }

  type Query {
    getProfiles(userID: ID): [Profile]
    getProfile (profileId: ID!): Profile!
    getAdminData: Admin
    isUserAdmin: IsAdmin
  }
`;
