import React from 'react';

export const UserList = ({ users, deleteUserHandler, changeUserType }) => {
  return (
    <table>
    <thead>
      <tr>
        <th>#</th>
        <th>имейл</th>
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
            <td>{user.isAdmin ? 'админ' : 'пользователь'}</td>
            <td>
              <a onClick={() => changeUserType(user.id)}>сделать { user.isAdmin ? 'пользователем' : 'админом'}</a>
            </td>
            <td>
              <a><i className="material-icons prefix" onClick={() => deleteUserHandler(user.id)}>delete_forever</i></a>
            </td> 
          </tr>
        )
      })}
    </tbody>
  </table>
  )
}