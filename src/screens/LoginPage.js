import React,{Component, useContext} from 'react';
import {authContext} from '../context/Auth';

import {
    useHistory,
    useLocation
  } from "react-router-dom";

function useAuth() {
  return useContext(authContext);
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let restaurantid	= "02e8cc31-5119-4fdf-b0c8-a518019ceec6";

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(restaurantid, () => {
      history.replace(from);
    });
  };

  return (
    <div>
	  {/*<p>You must log in to view the page at {from.pathname}</p>*/}
      <p>You must log in to view the Menu</p>
      <button onClick={()=>{login()}}>Start Ordering</button>
    </div>
  );
}

export default LoginPage;