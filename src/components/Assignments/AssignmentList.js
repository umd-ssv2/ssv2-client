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
} from "@material-ui/core";
import { student } from "../../assets/spoofData";
import "./assignments.scss";

const AssignmentList = ({ params }) => {
  let { year, semester, course } = params;
  let assignments = [];
  try {
    let list = student.courses[year][semester];
    assignments = list.find((x) => x.id == course).projects;
  } catch (err) {
    console.error("ERROR: ", err);
  }
  return (
    <div className="assignment-container">
      <TableContainer component={Paper} elevation={0}>
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
                <TableRow key={n}>
                  <TableCell>{x.title}</TableCell>
                  <TableCell>No status</TableCell>
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
      )}
    </div>
  );
};

export default AssignmentList;
