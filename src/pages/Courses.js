import React, { Component } from "react";
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
  IconButton,
} from "@material-ui/core/";
import {
  HomeRounded as HomeIcon,
  AssignmentRounded as AssignmentIcon,
  ScheduleRounded as SemesterIcon,
  ExpandLessRounded as ExpandLess,
  ExpandMoreRounded as ExpandMore,
  ChevronLeftRounded as ChevronLeft,
} from "@material-ui/icons";
import { Link, useRouteMatch } from "react-router-dom";
import CourseList from "./SemesterCourses";
import { AssignmentList } from "../components";
import "./courses.scss";

export default function Courses({ match }) {
  const [coursesOpen, setCoursesOpen] = React.useState(false);
  let assignmentMatch = useRouteMatch({
    path: "/:year/:semester/:course",
  });

  const toggleCourses = () => {
    setCoursesOpen(!coursesOpen);
  };

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
            <ListItem button onClick={toggleCourses}>
              <ListItemIcon>
                <SemesterIcon />
              </ListItemIcon>
              <ListItemText style={{ display: "flex" }}>Semester</ListItemText>
              {coursesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={coursesOpen} timeout="auto">
              <List disablePadding>
                {["Summer 2020", "Spring 2020", "Winter 2020"].map((x, n) => {
                  let semester = x.split(" ")[0].toLowerCase();
                  let year = x.split(" ")[1];
                  return (
                    <ListItem
                      button
                      component={Link}
                      to={`/${year}/${semester}`}
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
                          recent semesters are available. Semesters beyond that
                          are removed when the semester ends.
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
          {!assignmentMatch ? (
            <CourseList />
          ) : (
            <>
              <IconButton
                component={Link}
                to={`/${assignmentMatch.params.year}/${assignmentMatch.params.semester}`}
              >
                <ChevronLeft />
              </IconButton>
              <AssignmentList params={assignmentMatch.params} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
