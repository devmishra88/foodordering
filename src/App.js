import React, { useContext } from "react";
import {Switch, Route, Redirect, useHistory} from "react-router-dom";

import {authContext} from './context/Auth';

import {PublicPage, PrivatePage, LoginPage, Menu, AllCategories, AllItems, Itemdetail, CartDetail} from './screens';

export default function App() {
  return (
      <Switch>
        <Route exact path="/public">
          <PublicPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute exact path="/">
          <Menu />
        </PrivateRoute>
        <PrivateRoute exact path="/protected">
          <PrivatePage />
        </PrivateRoute>
        <PrivateRoute path="/menu">
          <Menu />
        </PrivateRoute>
        <PrivateRoute exact path="/allcategories">
          <AllCategories />
        </PrivateRoute>
        <PrivateRoute exact path="/allitems">
          <AllItems />
        </PrivateRoute>
        <Route exact path="/itemdetail/:iid" component={Itemdetail} />
        <Route exact path="/cartdetail" component={CartDetail} />
        {/*<PrivateRoute exact path="/itemdetail">
          <Itemdetail />
        </PrivateRoute>
        <PrivateRoute exact path="/cartdetail">
          <CartDetail />
        </PrivateRoute>*/}
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
      
        auth.restaurantid ? (
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