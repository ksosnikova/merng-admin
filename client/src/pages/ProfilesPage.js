import React, { useState, useCallback, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { ProfileList } from '../components/ProfileList';
import { useHttp } from '../hooks/http.hook';

export const ProfilesPage = () => {

  const [profiles, setProfiles] = useState([]);
  const { loading, request } = useHttp();

  const deleteHandler = async (id) => {
    try {
      const fetched = await request(`/api/profile/${id}`, 'DELETE', null);
      setProfiles(profiles.filter(profile => profile._id !== fetched._id));
    } catch (error) { }
  };

  const fetchProfiles = useCallback(async () => {
    try {
      const allProfiles = await request('/api/profile', 'GET', null);
      setProfiles(allProfiles);
    } catch (error) {}
  }, [request]);

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles]);

  if (loading) { return <Loader /> }

  return (
    <>
      {!loading && <ProfileList profiles={profiles} deleteHandler={deleteHandler} />}
    </>
  )
}