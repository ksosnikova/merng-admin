const Profile = require("../../models/Profile");
const User = require("../../models/User");
const config = require("config");
const isAuth = require("../../middleware/is-auth");

module.exports = {
  Query: {
    getAdminData: async (_, args, req) => {
      try {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
        const users = await User.find({});
        const profiles = await Profile.find({});
        return { users, profiles };
      } catch (error) {
        throw new Error(error);
      }
    },
    isUserAdmin: async (parent, args, req) => {
      try {
        console.log(req);
        const user = await User.findById({ _id: req.userId });
        return user.isAdmin;
      } catch (error) {}
    },
  },
  Mutation: {
    updateUser: async (_, { userId }, req) => {
      try {
        const deleteUser = await User.findById({
          _id: userId,
        });
        deleteUser.isAdmin = !deleteUser.isAdmin;
        await deleteUser.save();
        return deleteUser.id;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteUser: async (_, { userId }, req) => {
      try {
        const deleteUser = await User.findOneAndRemove({
          _id: userId,
        });
        const profilesDeleteByUser = await Profile.find({
          userID: userId,
        }).deleteMany();
        return deleteUser.id;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  // Subscription: {
  //   isUserAdmin: {
  //     subscribe: () => pubsub.asyncIterator([
  //       'IS_USER_ADMIN'
  //     ]),
  //   },
  // },
};
