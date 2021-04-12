import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";

export const ProfileList = ({ profiles, deleteHandler }) => {

  const [id, setId] = useState(null);

  if (!profiles.length) {
    return <p className="center">Профилей нет</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>имя</th>
          <th>пол</th>
          <th>город</th>
          <th>день рождения</th>
          <th>открыть</th>
          <th>редактировать</th>
          <th>удалить</th>
        </tr>
      </thead>

      <tbody>
        {profiles.map((profile, index) => {
          return (
            <tr key={profile._id}>
              <td>{index + 1}</td>
              <td>{profile.name}</td>
              <td>{profile.gender}</td>
              <td>{profile.city}</td>
              <td>{profile.birthday}</td>
              <td>
                <Link to={`/detail/${profile.id}`}>открыть</Link>
              </td>
              <td>
                <a>
                  <i
                    className="material-icons prefix"
                    onClick={() => setId(profile.id)}
                  >
                    mode_edit
                  </i>
                </a>
                {id === profile.id && (
                  <Modal
                    profile={profile}
                    closeModal={() => setId(null)}
                    onClick={() => {
                      setId(null);
                    }}
                  />
                )}
              </td>
              <td>
                <a>
                  <i
                    className="material-icons prefix"
                    onClick={() => deleteHandler(profile.id)}
                  >
                    delete_forever
                  </i>
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
