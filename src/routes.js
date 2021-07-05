import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import Page404 from "./pages/Page404";

export default ({ courses, setCourses }) => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/:term/courses" render={(props) => <Courses {...props} />} />
    <Route
      path="/:term/:course"
      render={(props) => <Assignments {...props} />}
    />
    <Route path="/" component={Courses} />

    <Route component={Page404} />
  </Switch>
);
