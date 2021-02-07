import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./header.scss";

class Header extends Component {
  render() {
    return (
      <AppBar position="relative" className="umd-header">
        <Typography
          component="a"
          href="https://umd.edu"
          target="_blank"
          className="umd-link"
        >
          UNIVERSITY OF MARYLAND
        </Typography>
      </AppBar>
    );
  }
}

export default Header;
