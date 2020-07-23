import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Courses from "./pages/Courses";
import Page404 from "./pages/Page404";

export default () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" exact component={Courses} />
    <Route path="/:year/:semester" component={Courses} />
    <Route component={Page404} />
  </Switch>
);
