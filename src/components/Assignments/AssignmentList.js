import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Typography,
  IconButton,
} from "@material-ui/core";
import { ChevronLeftRounded as ChevronLeft } from "@material-ui/icons";
import { Link, useHistory, Route, Switch } from "react-router-dom";
import { Assignment } from "../../components";
import "./assignment-list.scss";

const AssignmentList = (props) => {
  const history = useHistory();
  let params = props.match.params;
  let { student } = props;
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
    <Paper className="assignment-container" style={{ position: "relative" }}>
      <Typography variant="h4" align="center">
        {course}
      </Typography>
      <Switch>
        <Route exact path="/:term/:course">
          {/* <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((x, n) => {
                  return (
                    <TableRow
                      key={n}
                      onClick={() =>
                        history.push(`/${term}/${course}/${x.projid}`)
                      }
                      className="assignment-row"
                    >
                      <TableCell>{x.title}</TableCell>
                      <TableCell>No </TableCell>
                      <TableCell>{x.due}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {assignments.length > 0 ? null : (
            <Typography variant="body1" className="assignment-none">
              No assignments found
            </Typography>
          )} */}
          <Typography variant="h6" align="center">
            No assignment selected
          </Typography>
        </Route>
        <Route
          path="/:term/:course/:proj"
          render={(props) => <Assignment {...props} student={student} />}
        />
      </Switch>
    </Paper>
  );
};

export default AssignmentList;
