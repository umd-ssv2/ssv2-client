import React from "react";
import { Switch } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
import { CourseCard } from "..";
import "./courselist.scss";

//TODO: This data should be fetched
import { student } from "../../assets/spoofData";

function CourseList(props) {
  let params = props.match.params;
  let { term } = params;
  let sem = "",
    year = "";
  let termPattern = /^(summer|spring|winter|fall)([0-9]{4})$/i;
  let match = term.match(termPattern);
  let course_list = [];

  if (match) {
    sem = match[1];
    year = match[2];
    try {
      let list = student.courses[year][sem.toLowerCase()];
      if (list !== undefined) {
        course_list = list;
      }
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  return (
    <Paper className="main-paper">
      <Typography variant="h4" align="center">
        {match
          ? `Your CS Courses for ${sem} ${year}`
          : `Error: No semester found called '${term}'`}
      </Typography>
      <div className="coursecard-container">
        {course_list.length > 0 ? (
          course_list.map((x, n) => (
            <CourseCard term={term} course={x} key={n} />
          ))
        ) : (
          <p className="no-course-centered">
            Unable to find any courses for {student.dirid}
          </p>
        )}
      </div>
    </Paper>
  );
}

export default CourseList;
