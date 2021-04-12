import React from "react";
import { Loader } from "../components/Loader";
import { UserList } from "../components/UserList";
import { getAge } from "../utils/getAge";
import { ProfileList } from "../components/ProfileList";
import { DELETE_USER, GET_ALL_DATA, UPDATE_USER, DELETE_PROFILE } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";

export const AdminPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);

  const [
    deleteUser,
    { error: errorDeletion, loading: loadingDeletion },
  ] = useMutation(DELETE_USER);

  const [
    updateUser,
    { error: errorChange, loading: loadingChange },
  ] = useMutation(UPDATE_USER);

  const [
    deleteProfile,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_PROFILE);

  const deleteUserHandler = async (userId) => {
    const data = await deleteUser({
      variables: { userId },
      refetchQueries: [{ query: GET_ALL_DATA }],
    });
  };

  const changeUserType = async (userId) => {
    const data = await updateUser({
      variables: { userId },
      refetchQueries: [{ query: GET_ALL_DATA }],
    });
  };

  const deleteProfileHandler = async (id) => {
    try {
      const data = await deleteProfile({
        variables: { profileId: id },
        refetchQueries: [{ query: GET_ALL_DATA }],
      });
    } catch (error) {}
  };

  const adultsProfiles = () => {
    let countAdults = 0;
    data.getAdminData.profiles.forEach((profile) => {
      if (getAge(profile.birthday) >= 18) {
        countAdults++;
      }
    });
    return countAdults;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h4>Всего пользователей: {data.getAdminData.users.length}</h4>
      {!loading && (
        <UserList
          profiles={data.getAdminData.profiles}
          users={data.getAdminData.users}
          deleteUserHandler={deleteUserHandler}
          changeUserType={changeUserType}
        />
      )}
      <h4>Всего профилей: {data.getAdminData.profiles.length}</h4>
      <p>Профилей старше 18 лет: {adultsProfiles()}</p>
      {!loading && (
        <ProfileList
          profiles={data.getAdminData.profiles}
          users={data.getAdminData.users}
          deleteHandler={deleteProfileHandler}
        />
      )}
    </>
  );
};
