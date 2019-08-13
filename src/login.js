import React, { Component } from "react";
import "./login.css";

export default class Login extends Component {

  componentDidMount() {
    document.body.classList.add('login-body');
  }

  componentWillUnmount() {
    document.body.classList.remove('login-body');
  }

  handleLogin = event => {
    event.preventDefault();
    localStorage.setItem('lastRoute', window.location.pathname);
    console.log('clicked!!')
    window.location.href = `http://localhost:3000/cas_login`;
    //window.location.href = 'http://www.row2k.com'
  };

  render() {
    return (
      <div className="login">
        <div className="lander">
          <h1>Submit Server 2.0</h1>
          <div className="login-btn-box login-btn">
              <a className="btn btn-info btn-lg cas-btn" role="button" onClick={this.handleLogin}>
                CAS Login
              </a>
            </div>
        </div>
      </div>
    );
  }
}
