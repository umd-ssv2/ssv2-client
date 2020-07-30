import React, { Component, useState } from "react";
import {
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  ListSubheader,
  Divider,
  Paper,
} from "@material-ui/core/";
import {
  HomeRounded as HomeIcon,
  AssignmentRounded as AssignmentIcon,
  ScheduleRounded as SemesterIcon,
  ExpandLessRounded as ExpandLess,
  ExpandMoreRounded as ExpandMore,
  ChevronLeftRounded as ChevronLeft,
} from "@material-ui/icons";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import { AssignmentList, CourseList } from "../components";
import "./courses.scss";

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesOpen: false,
    };
    this.params = this.props.match.params;
  }
  // let assignmentMatch = useRouteMatch({
  //   path: "/:year/:semester/:course",
  // });

  toggleCourses = () => {
    this.setState({ coursesOpen: !this.state.coursesOpen });
  };

  render() {
    let { coursesOpen } = this.state;
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <List component="nav">
              <ListSubheader>Menu</ListSubheader>
              {/* <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem> */}
              <ListItem button onClick={this.toggleCourses}>
                <ListItemIcon>
                  <SemesterIcon />
                </ListItemIcon>
                <ListItemText style={{ display: "flex" }}>
                  Semesters
                </ListItemText>
                {coursesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={coursesOpen} timeout="auto">
                <List disablePadding>
                  {["summer2020", "spring2020", "winter2020"].map((x, n) => {
                    return (
                      <ListItem
                        button
                        component={Link}
                        to={`/${x}/courses`}
                        key={n}
                        className="list-past-semester"
                      >
                        <ListItemText primary={x} />
                      </ListItem>
                    );
                  })}
                  <Divider style={{ marginLeft: 30 }} />
                  <ListItem dense className="list-past-semester">
                    <ListItemText
                      primary={
                        <>
                          <p>
                            *Note that only the current semester and two most
                            recent semesters are available. Semesters beyond
                            that are removed when the semester ends.
                          </p>
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Grid>
          <Grid item xs={9}>
            <Switch>
              <Route
                path="/:term/courses"
                render={(props) => (
                  <CourseList
                    {...props}
                    term={props.match.params.term}
                    courses={this.props.courses}
                    setCourses={this.props.setCourses}
                  />
                )}
              />
              <Route
                path="/"
                render={(props) => (
                  <Paper className="semester-paper">
                    <p>No semester selected</p>
                  </Paper>
                )}
              />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
