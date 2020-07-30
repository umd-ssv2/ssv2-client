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
import { Link, Switch, Route } from "react-router-dom";
import { AssignmentList } from "../components";
import axios from "axios";
import global from "../global";

const termPattern = /^(summer|spring|winter|fall)([0-9]{4})$/i;

export default class Assignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [], //Specific to this student
      loading: false,
    };
  }

  componentDidMount() {
    let { term, course } = this.props.match.params;
    axios
      .get(
        `${global.serverURL}/${term}/${course}/project?dirid=${global.dirid}`
      )
      .then((res) => {
        console.log(res);
        this.setState({ projects: res.data.projects });
      })
      .catch((err) => console.log(err));
  }
  // const params = props.match.params;
  // let { term, course } = params;
  // let sem = "",
  //   year = "";
  // let termPattern = /^(summer|spring|winter|fall)([0-9]{4})$/i;
  // let match = term.match(termPattern);
  // let assignments = [];
  // if (match) {
  //   sem = match[1];
  //   year = match[2];
  //   try {
  //     let list = student.courses[year][sem];
  //     assignments = list.find((x) => x.id === course).projects;
  //   } catch (err) {
  //     console.error("ERROR: ", err);
  //   }
  // }
  getProject = (id) => {
    let proj = this.state.projects.find((p) => p.projid == id);
    return proj;
  };

  render() {
    let { term, course } = this.props.match.params;
    let { projects, proj } = this.state;
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
              {projects.length > 0 ? (
                projects.map((x, n) => {
                  return (
                    <ListItem
                      button
                      key={n}
                      onClick={() => {
                        this.props.history.push(
                          `/${term}/${course}/${x.projid}`
                        );
                      }}
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
            </List>
          </Grid>
          <Grid item xs={10}>
            <Switch>
              <Route
                path="/:term/:course"
                render={(props) => (
                  <AssignmentList {...props} getProject={this.getProject} />
                )}
              />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
