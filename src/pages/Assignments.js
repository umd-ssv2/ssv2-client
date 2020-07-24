import React from "react";
import {
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  ListSubheader,
  IconButton,
  Divider,
  Paper,
} from "@material-ui/core/";
import { ChevronLeftRounded as ChevronLeft } from "@material-ui/icons";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import { AssignmentList } from "../components";
import { student } from "../assets/spoofData";

const Assignments = (props) => {
  const history = useHistory();
  const params = props.match.params;
  let { term, course } = params;
  let sem = "",
    year = "";
  let termPattern = /^(summer|spring|winter|fall)([0-9]{4})$/i;
  let match = term.match(termPattern);
  let assignments = [];
  if (match) {
    sem = match[1];
    year = match[2];
    try {
      let list = student.courses[year][sem];
      assignments = list.find((x) => x.id === course).projects;
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <List component="nav">
            <ListSubheader>
              <IconButton component={Link} to={`/${term}/courses`}>
                <ChevronLeft />
              </IconButton>
            </ListSubheader>
            {assignments.length > 0 ? (
              assignments.map((x, n) => {
                return (
                  <ListItem
                    button
                    key={n}
                    onClick={() =>
                      history.push(`/${term}/${course}/${x.projid}`)
                    }
                  >
                    <ListItemText primary={`${x.title}`} />
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <ListItemText>No Assignments found</ListItemText>
              </ListItem>
            )}
            {/* <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem> */}
            {/* <ListItem button onClick={toggleCourses}>
              <ListItemIcon>
                <SemesterIcon />
              </ListItemIcon>
              <ListItemText style={{ display: "flex" }}>Semesters</ListItemText>
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
                          recent semesters are available. Semesters beyond that
                          are removed when the semester ends.
                        </p>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Collapse> */}
          </List>
        </Grid>
        <Grid item xs={10}>
          <Switch>
            <Route
              path="/:term/:course"
              render={(props) => (
                <AssignmentList {...props} student={student} />
              )}
            />
          </Switch>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Assignments;
