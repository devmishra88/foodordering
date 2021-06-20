import React from "react";
import {Switch, Route} from "react-router-dom";
import {LoginPage, Menu, AllCategories, AllItems, Itemdetail, CartDetail, Removecartitem} from './screens';

export default function App() {
  return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/allcategories" component={AllCategories} />
        <Route exact path="/allitems" component={AllItems} />
        <Route exact path="/itemdetail/:iid" component={Itemdetail} />
        <Route exact path="/cartdetail" component={CartDetail} />
        <Route exact path="/removecartitem/:iid" component={Removecartitem} />
      </Switch>
  );
}
