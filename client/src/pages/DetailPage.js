import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { ProfileCard } from "../components/ProfileCard";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../graphql/queries";

export const DetailPage = () => {

  const profileId = useParams().id;

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { profileId },
  });
  
  if (loading) {
    return <Loader />;
  }

  return (
    <>{!loading && data && <ProfileCard profile={data.getProfile} />}</>
  );
};
