import React from "react";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom/";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import { useQuery, gql } from "@apollo/client";
import "materialize-css";

export const IS_AUTH = gql`
  query isLoggedIn {
    isLoggedIn @client
    isAdmin @client
  }
`;

function App() {

  const { loading, error, data } = useQuery(IS_AUTH);
  const routes = useRoutes(data.isLoggedIn);

  if (error) return `Error occured: ${error}`;
  if (loading) return <Loader />;

  return (
      <Router>
        {data.isLoggedIn && <Navbar isAdmin={data.isAdmin} />}
        <div className="container">{routes}</div>
      </Router>
  );
}

export default App;
