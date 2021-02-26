import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { ProfileCard } from '../components/ProfileCard';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {

  const { request, loading } = useHttp();
  const [profile, setProfile] = useState(null);
  const profileId = useParams().id;

  const getProfile = useCallback(async () => {
    try {
      const fetched = await request(`/api/profile/${profileId}`, 'GET', null)
      setProfile(fetched);
    } catch (error) {
    }
  }, [profileId, request]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && profile && <ProfileCard profile={profile} />}
    </>
  )
}