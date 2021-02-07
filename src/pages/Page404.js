import React from "react";
import { Typography, Container, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Page404 = () => {
  return (
    <Container maxWidth="md">
      <div style={styles.container}>
        <Typography
          variant="h2"
          align="center"
          style={{ fontFamily: "Crimson" }}
        >
          404
        </Typography>
        <Typography align="center" variant="h6">
          <span role="img" aria-label="emoji with open-mouth">
            😮
          </span>{" "}
          Sorry, Testudo couldn't find the page you are looking for.
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to="/"
          style={{ borderColor: "#e21833", marginTop: 20 }}
        >
          My Courses
        </Button>
      </div>
    </Container>
  );
};

export default Page404;
