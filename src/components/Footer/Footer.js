import React, { Component } from "react";
import { AppBar, Typography } from "@material-ui/core";
import "./footer.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="umd-footer" position="static">
        <div className="footer-container">
          <p>&copy; 2020 Copyright UMD CS Dudes. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
