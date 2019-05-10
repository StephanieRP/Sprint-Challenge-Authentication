import React, { Component } from "react";
import axios from "axios";

import Authenticated from "../Auth/Authenticated";

class Jokes extends Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <>
        <h2>My current Jokes</h2>
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.joke}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const endpoint = "/jokes";
    const token = localStorage.getItem("token");
    const requestConfig = {
      headers: {
        authorization: token
      }
    };
    axios
      .get(endpoint, requestConfig)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => console.error(err));
  }
}

export default Authenticated(Jokes);
