import React, { createContext, useState } from "react";

const authContext = createContext();

const fakeAuth = {
  isAuthenticated: false,
  signin(restaurantid, user, cb) {

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
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [isagree, setIsAgree] = useState(localStorage.getItem('isagree'));

  const signin = (restaurantid, user, isagree, cb) => {
    return fakeAuth.signin(restaurantid, user, () => {

		localStorage.setItem(`restaurantid`,restaurantid);
		localStorage.setItem(`user`, user);
		localStorage.setItem(`isagree`, isagree);

		setRestaurant(restaurantid);
		setUser(user);
		setIsAgree(isagree);
		cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {

		localStorage.setItem(`restaurantid`,'');
		localStorage.setItem(`user`,'');
		localStorage.setItem(`isagree`,'');

		setRestaurant(null);
		setUser(null);
		setIsAgree(null);
		cb();
    });
  };

  return {
    restaurantid,
    user,
    isagree,
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