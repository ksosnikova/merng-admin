import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { ProfileCard } from '../components/ProfileCard';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {

  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [profile, setProfile] = useState(null);
  const profileId = useParams().id;

  // const getProfile = useCallback(async () => {
  //   try {
  //     const fetched = await request(`/api/profiles/${profileId}`, 'GET', {
  //       Authorization: `Bearer ${token}`
  //     })
  //     setProfile(fetched);
  //   } catch (error) {

  //   }
  // }, [token, profileId, request]);

  const getProfile = async () => {
    try {
      const fetched = await request(`/api/profiles/${profileId}`, 'GET', {
        Authorization: `Bearer ${token}`
      })
      setProfile(fetched);
    } catch (error) {
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && profile && <ProfileCard profile={profile}/>}
    </>
  )
}