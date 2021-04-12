import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Loader } from "../components/Loader";
import { ProfileList } from "../components/ProfileList";
import { GET_PROFILES, DELETE_PROFILE } from "../graphql/queries";
import { useMutation } from "@apollo/client";

export const ProfilesPage = () => {

  const { loading, error, data } = useQuery(GET_PROFILES);

  const [
    deleteProfile,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_PROFILE);

  const deleteHandler = async (id) => {
    try {
      const data = await deleteProfile({
        variables: { profileId: id },
        refetchQueries: [{ query: GET_PROFILES }],
      });
    } catch (error) {}
  };

  if (loading) {
    return <Loader />;
  }
  if (error) return `Error! ${error}`;

  return (
    <>
      {!loading && (
        <ProfileList
          profiles={data?.getProfiles}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
};
