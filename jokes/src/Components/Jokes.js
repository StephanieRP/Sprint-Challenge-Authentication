import React, { Component } from "react";
import axios from "axios";

import Authenticated from "../Auth/Authenticated";

class Jokes extends Component {
  state = {
    jokes: []
  };

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

  render() {
    return (
      <div className="jokes">
        <h2>My current Jokes</h2>
        <div className="joke-list">
          {this.state.jokes.map(joke => (
            <div key={joke.id}>{joke.joke}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Authenticated(Jokes);
