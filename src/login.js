import React, { Component } from "react";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardHeader,
  Container,
} from "@material-ui/core";
import "./login.scss";

export default class Login extends Component {
  handleLogin = (event) => {
    event.preventDefault();
    let lastRoute = window.location.href;
    localStorage.setItem("lastRoute", lastRoute);
    window.location.href = `http://localhost:3000/cas_login?service=${lastRoute}/2020/summer`;
    //window.location.href = 'http://www.row2k.com'
  };

  render() {
    return (
      <Container maxWidth="lg">
        <div className="login">
          <Card className="login-card">
            <CardHeader title="UMD CS Submission Server 2.0"></CardHeader>
            <CardMedia
              component="img"
              alt="UMD CS Department Logo"
              image={require("./assets/images/cs_dept_logo.png")}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Log in with your University of Maryland account by clicking the
                "UMD CAS Login" button.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                className="cas-btn"
                onClick={this.handleLogin}
                fullWidth
              >
                UMD CAS Login
              </Button>
            </CardActions>
          </Card>
        </div>
      </Container>
    );
  }
}
