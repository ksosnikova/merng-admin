import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../constatns';
import { isLoggedIn } from '../cache';
import { useApolloClient } from "@apollo/client";

export const Navbar = ({ isAdmin }) => {

  const history = useHistory();
  const client = useApolloClient();

  const logoutHandler = event => {
    event.preventDefault();
    localStorage.removeItem(AUTH_TOKEN);
    isLoggedIn(false);
    client.cache.reset();
    //  history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper teal lighten-3">
      { isAdmin ? <span className="brand-logo"><NavLink to='/admin'>Админ</NavLink></span> :
        <span href="/" className="brand-logo">Профили</span> }
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to='/create'>Создать</NavLink></li>
          <li><NavLink to='/profiles'>Профили</NavLink></li>
          <li><a onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}