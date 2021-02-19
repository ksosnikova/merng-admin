import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {

  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper teal lighten-3">
        <span href="/" className="brand-logo">Профили</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to='/create'>Создать</NavLink></li>
          <li><NavLink to='/profiles'>Профили</NavLink></li>
          <li><a onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}