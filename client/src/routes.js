import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { DetailPage } from './pages/DetailPage';
import { ProfilesPage } from './pages/ProfilesPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route>
          <ProfilesPage path='/profiles' exact />
        </Route>
        <Route path='/profiles' exact>
          <ProfilesPage />
        </Route>
        <Route path='/detail/:id'>
          <DetailPage />
        </Route>
        <Redirect to='/create' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage />
      </Route>
      <Redirect to='/' />
    </Switch>)
}