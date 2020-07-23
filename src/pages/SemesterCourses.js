import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
import { CourseCard } from "../components";
import "./courses.scss";

//TODO: This data should be fetched
import { student } from "../assets/spoofData";

const SemesterCourses = () => {
  let match = useRouteMatch({
    path: "/:year/:semester",
  });
  return (
    <Paper className="main-paper">
      {match ? (
        <CourseList params={match.params} />
      ) : (
        <Typography variant="h4">No Semester Selected</Typography>
      )}
    </Paper>
  );
};

function CourseList({ params }) {
  let { year, semester } = params;
  let sem = semester.charAt(0).toUpperCase() + semester.slice(1);
  let course_list = [];
  try {
    let list = student.courses[year][semester.toLowerCase()];
    if (list !== undefined) {
      course_list = list;
    }
  } catch (err) {
    console.error("ERROR: ", err);
  }
  return (
    <>
      <Typography variant="h4" align="center">
        Your CS Courses for {sem} {year}
      </Typography>
      <div className="coursecard-container">
        {course_list.length > 0 ? (
          course_list.map((x, n) => (
            <CourseCard semester={semester} year={year} course={x} key={n} />
          ))
        ) : (
          <p className="no-course-centered">
            Unable to find any courses for {student.dirid} in {sem} {year}
          </p>
        )}
      </div>
    </>
  );
}

export default SemesterCourses;
