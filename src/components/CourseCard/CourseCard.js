import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import "./coursecard.scss";
import { Link, useLocation } from "react-router-dom";

const CourseCard = ({ term, course }) => {
  return (
    <Link to={`/${term}/${course.id}`} className="fixed-link">
      <Card className="coursecard" elevation={2}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">{course.id}</Typography>
            <Typography gutterBottom variant="body2">
              {course.description}
            </Typography>
          </CardContent>
          <CardActions className="card-cta">
            <Typography variant="body1" className="card-assignments">
              {course.projects.length} assignments
            </Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default CourseCard;
