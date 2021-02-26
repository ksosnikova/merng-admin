import React from 'react';
import { Link } from 'react-router-dom';

export const UserList = ({ users, deleteUser, changeUserType, profiles }) => {

  return (
    <table>
    <thead>
      <tr>
        <th>#</th>
        <th>имейл</th>
        <th>профили</th>
        <th>тип аккаунта</th>
        <th>изменить</th>
        <th>удалить</th> 
      </tr>
    </thead>

    <tbody>
      {users.map((user, index) => {
        return (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.email}</td>
            <td><Link to={`api/profiles/${user._id}`}>профили</Link></td>
           
            <td>{user.isAdmin ? 'админ' : 'пользователь'}</td>
            <td>
              <a onClick={() => changeUserType(user._id)}>сделать { user.isAdmin ? 'пользователем' : 'админом'}</a>
            </td>
            <td>
              <a><i className="material-icons prefix" onClick={() => deleteUser(user._id)}>delete_forever</i></a>
            </td> 
          </tr>
        )
      })}
    </tbody>
  </table>
  )
}