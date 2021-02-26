import React from 'react';

export const ProfileCard = ({ profile }) => {
  
  return (
    <div>
      <h2>Профиль</h2>
      <p>имя: {profile.name}</p>
      <p>пол: {profile.gender}</p>
      <p>город: {profile.city}</p>
      <p>дата рождения: {profile.birthday}</p>
    </div>
  )
}