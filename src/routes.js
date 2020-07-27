import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import Page404 from "./pages/Page404";

export default () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/:term/courses" component={Courses} />
    <Route path="/:term/:course" component={Assignments} />
    <Route path="/" component={Courses} />

    <Route component={Page404} />
  </Switch>
);
