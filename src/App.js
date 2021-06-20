import React, { useContext } from "react";
import {Switch, Route, Redirect, useHistory} from "react-router-dom";

import {authContext} from './context/Auth';

import {PublicPage, PrivatePage, LoginPage, Menu, AllCategories, AllItems, Itemdetail, CartDetail, Removecartitem} from './screens';

export default function App() {
  return (
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute exact path="/">
          <Menu />
        </PrivateRoute>
        <PrivateRoute exact path="/allcategories">
          <AllCategories />
        </PrivateRoute>
        <PrivateRoute exact path="/allitems">
          <AllItems />
        </PrivateRoute>
        <PrivateRoute exact path="/cartdetail">
          <CartDetail />
        </PrivateRoute>
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/itemdetail/:iid" component={Itemdetail} />
        <Route exact path="/removecartitem/:iid" component={Removecartitem} />
      </Switch>
  );
}

function useAuth() {
  return useContext(authContext);
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