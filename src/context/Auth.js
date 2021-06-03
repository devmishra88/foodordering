import React, { createContext, useState } from "react";

const authContext = createContext();

const fakeAuth = {
  isAuthenticated: false,
  signin(restaurantid, cb) {

    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function useProvideAuth() {
  const [restaurantid, setRestaurant] = useState(localStorage.getItem('restaurantid'));

  const signin = (restaurantid, cb) => {
    return fakeAuth.signin(restaurantid, () => {

		localStorage.setItem(`restaurantid`,restaurantid);

		setRestaurant(restaurantid);
		cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {

		localStorage.setItem(`restaurantid`,'');

		setRestaurant(null);
		cb();
    });
  };

  return {
    restaurantid,
    signin,
    signout
  };
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

const AuthConsumer = authContext.Consumer;

export {ProvideAuth, AuthConsumer, authContext};