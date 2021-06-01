import React, { useContext } from "react";
import {Switch, Route, Link, Redirect, useHistory} from "react-router-dom";

import {authContext} from './context/Auth';

import {PublicPage, PrivatePage, LoginPage, Menu} from './screens';

export default function App() {
  return (
      <Switch>
        <Route path="/public">
          <PublicPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/protected">
          <PrivatePage />
        </PrivateRoute>
        <PrivateRoute path="/menu">
          <Menu />
        </PrivateRoute>
      </Switch>
  );
}

function useAuth() {
  return useContext(authContext);
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}