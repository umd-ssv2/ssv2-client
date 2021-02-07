import React from "react";
import { Switch } from "react-router-dom";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
import { CourseCard } from "..";
import axios from "axios";
import global from "../../global";
import "./courselist.scss";

const termPattern = /^(summer|spring|winter|fall)([0-9]{4})$/i;
export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sem: "",
      year: "",
      term: "",
      courseList: [],
      loading: false,
    };
  }

  newTerm = (term) => {
    let match = term.match(termPattern);

    if (match) {
      this.setState({ loading: true });
      axios
        .get(`${global.serverURL}/${term}/courses?dirid=${global.dirid}`)
        .then((res) => {
          console.log(res);
          window.setTimeout(() => {
            this.setState({
              sem: match[1],
              year: match[2],
              courseList: res.data.courseList,
              term: term,
              loading: false,
            });
          }, 500); //TODO: Remove this fake loading before production
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidUpdate() {
    if (!this.state.loading && this.state.term !== this.props.term) {
      this.newTerm(this.props.term);
    }
  }

  componentDidMount() {
    // console.log("Fetching new term info");
    if (this.state.term !== this.props.term) {
      this.newTerm(this.props.term);
    }
  }

  render() {
    let { sem, year, term, courseList, loading } = this.state;

    return (
      <Paper className="main-paper">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4" align="center">
              {sem !== "" && year !== ""
                ? `Your CS Courses for ${sem} ${year}`
                : `Error: No semester found called '${term}'`}
            </Typography>
            <div className="coursecard-container">
              {courseList.length > 0 ? (
                courseList.map((x, n) => (
                  <CourseCard term={term} course={x} key={n} />
                ))
              ) : (
                <p className="no-course-centered">
                  Unable to find any courses for {global.dirid}
                </p>
              )}
            </div>
          </>
        )}
      </Paper>
    );
  }
}
