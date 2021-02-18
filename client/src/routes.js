import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { CreateProfile } from './pages/CreateProfile';
import { DetailPage } from './pages/DetailPage';
import { ProfilesPage } from './pages/ProfilesPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/profiles' exact>
          <ProfilesPage />
        </Route>
        <Route path='/create' exact>
          <CreateProfile />
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