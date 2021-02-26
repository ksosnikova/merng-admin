import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { UserList } from '../components/UserList';
import { useHttp } from '../hooks/http.hook';
import { getAge } from '../utils/getAge';
import { ProfileList } from '../components/ProfileList';

export const AdminPage = () => {

  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const { loading, request } = useHttp();

  const changeUserType = async (id) => {
    try {
      const fetched = await request(`/api/admin/${id}`, 'PATCH', null, {});
      let newUserList = users.filter(user => user._id !== fetched._id);
      setUsers([...newUserList, fetched]);
    } catch (error) { }
  };

  const deleteUser = async (id) => {
    try {
      const fetched = await request(`/api/admin/${id}`, 'DELETE', null, {});
      setUsers(users.filter(user => user._id !== user._id));
    } catch (error) { }
  };

  const getAllUsers = useCallback(async () => {
    try {
      const { usersDB, profilesDB } = await request(`/api/admin/`, 'GET', null);
      setUsers(usersDB);
      setProfiles(profilesDB);
    } catch (error) { }
  }, [request]);

  const adultsProfiles = () => {
    let countAdults = 0;
    profiles.forEach(profile => {
      if (getAge(profile.birthday) >= 18) { countAdults++ }
    });
    return countAdults;
  }

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers]);

  if (loading) { return <Loader /> }

  return (
    <>
      <h4>Всего пользователей: {users.length}</h4>
      {!loading && <UserList profiles={profiles} users={users} deleteUser={deleteUser} changeUserType={changeUserType} />}
      <h4>Всего профилей: {profiles.length}</h4>
      <p>Профилей старше 18 лет: {adultsProfiles()}</p>
      {!loading && <ProfileList profiles={profiles} users={users} deleteUser={deleteUser} changeUserType={changeUserType} />}
    </>
  )
}