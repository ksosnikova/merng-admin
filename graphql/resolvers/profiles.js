const Profile = require("../../models/Profile");
const User = require("../../models/User");
const config = require("config");
const isAuth = require("../../middleware/is-auth");

module.exports = {
  Query: {
    getProfile: async (parent, { profileId }, req) => {
      try {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
        const profile = await Profile.findOne({ _id: profileId });
        return profile;
      } catch (error) {
        throw new Error(error);
      }
    },
    getProfiles: async (parent, args, req) => {
      try {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
        const profiles = await Profile.find({ userID: req.userId });
        return profiles;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createProfile: async (_, args, req) => {
      try {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
        const { name, city, gender, birthday } = args.profileInput;

        const profile = new Profile({
          name,
          city,
          gender,
          birthday,
          userID: req.userId,
        });

        await profile.save();

        return {
          id: profile.id,
          name,
          city,
          gender,
          birthday,
          userID: req.userId,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateProfile: async (_, args, req) => {
      try {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
        const id = args.profileId;
        const { name, city, gender, birthday } = args.profileInput;

        const updatingProfile = await Profile.findByIdAndUpdate(
          { _id: id },
          { id, name, city, gender, birthday, userID: req.userId }
        );

        await updatingProfile.save();

        return {
          id,
          name,
          city,
          gender,
          birthday,
          userID: req.userId,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteProfile: async (_, { profileId }, req) => {
      try {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
        const deleteProfile = await Profile.findOneAndRemove({
          _id: profileId,
        });
        return deleteProfile.id;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  // Profile: {
  //   owner: ({ userID }) => {
  //     return User.findById(userID);
  //   },
  // },
};
