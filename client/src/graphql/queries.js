import { gql } from "@apollo/react-hooks";

export const GET_PROFILES = gql`
  query getProfiles($userID: ID) {
    getProfiles(userID: $userID) {
      id
      name
      gender
      birthday
      city
      userID
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($profileId: ID!) {
    getProfile(profileId: $profileId) {
      id
      name
      gender
      birthday
      city
      userID
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation CreateProfile($profileInput: ProfileInput!) {
    createProfile(profileInput: $profileInput) {
      id
      name
      city
      birthday
      gender
      userID
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profileId: ID!, $profileInput: ProfileInput!) {
    updateProfile(profileId: $profileId, profileInput: $profileInput) {
      id
      name
      city
      birthday
      gender
      userID
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation DeleteProfile($profileId: ID!) {
    deleteProfile(profileId: $profileId)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!) {
    updateUser(userId: $userId)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const IS_USER_ADMIN = gql`
  query IsUserAdmin {
    isAdmin
  }
`;

export const GET_ALL_DATA = gql`
  query getAdminData {
    getAdminData {
      users {
        id
        email
        isAdmin
      }
      profiles {
        id
        name
        gender
        birthday
        city
        userID
      }
    }
  }
`;
