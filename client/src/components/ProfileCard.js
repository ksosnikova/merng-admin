import React from 'react';

export const ProfileCard = ({ profile }) => {
  
  return (
    <>
      <h2>Профиль</h2>
      <p>{profile.name}</p>
      <p>{profile.gender}</p>
      <p>{profile.city}</p>
      <p>{profile.birthday}</p>
    </>
  )
}