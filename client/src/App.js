import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom/';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import 'materialize-css';

function App() {

  const { token, userId, login, logout, ready, isAdmin } = useAuth();
  const isAuthenticated = !!token;
  // const userIsAdmin = !!isAdmin;
  const routes = useRoutes(isAuthenticated);
  
  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated, isAdmin
    }}>
    <Router>
      { isAuthenticated && <Navbar isAdmin={isAdmin} />}
      <div className="container">
        {routes}
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
