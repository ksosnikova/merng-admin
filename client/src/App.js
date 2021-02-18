import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom/'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';

function App() {

  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
    <Router>
      <div className="container">
        {routes}
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
