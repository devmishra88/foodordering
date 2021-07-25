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

const nosh_localdata = localStorage.getItem(`nosh_localdata`) !== null ? JSON.parse(localStorage.getItem(`nosh_localdata`)):{restaurantid:'', phone:'', isagree:''};

function useProvideAuth() {
  /*const [restaurantid, setRestaurant] = useState(localStorage.getItem('restaurantid'));
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [isagree, setIsAgree] = useState(localStorage.getItem('isagree'));*/

  const [restaurantid, setRestaurant] = useState(nosh_localdata.restaurantid);
  const [user, setUser] = useState(nosh_localdata.phone);
  const [isagree, setIsAgree] = useState(nosh_localdata.isagree);

  const signin = (restaurantid, user, isagree, cb) => {
    return fakeAuth.signin(restaurantid, user, () => {

      let nosh_localdata = {restaurantid:restaurantid, phone:user, isagree:isagree};

      /*localStorage.setItem(`restaurantid`,restaurantid);
      localStorage.setItem(`isagree`, isagree);
      localStorage.setItem(`user`, user);*/
      localStorage.setItem(`nosh_localdata`, JSON.stringify(nosh_localdata));

      setRestaurant(nosh_localdata.restaurantid);
      setUser(nosh_localdata.user);
      setIsAgree(nosh_localdata.isagree);
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() =>{

		/*localStorage.setItem(`restaurantid`,'');
		localStorage.setItem(`user`,'');
		localStorage.setItem(`isagree`,'');*/
		localStorage.setItem(`nosh_localdata`,'{}');

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