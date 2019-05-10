import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = event => {
    const { id, value } = event.target;

    this.setState({ [id]: value });
  };

  submitHandler = event => {
    event.preventDefault();
    const link = "http://localhost:5000/api/login";

    axios
      .post(link, this.state)
      .then(res => {
        localStorage.setItem("token", res.data.myToken);
        this.props.history.push("/jokes");
      })
      .catch(err => {
        console.error("Problem Logging in!", err);
      });
  };

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={this.submitHandler}>
          <div>
            <label htmlFor="username" />

            <input
              id="username"
              onChange={this.changeHandler}
              value={this.state.username}
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              id="password"
              onChange={this.changeHandler}
              value={this.state.password}
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
