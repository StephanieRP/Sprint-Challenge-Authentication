import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import Login from "./Components/Login";
import Jokes from "./Components/Jokes";

function App() {
  return (
    <>
      <header>
        <NavLink
          to="/login"
          activeStyle={{
            fontWeight: "bold",
            background: "green"
          }}
        >
          {" "}
          Login{" "}
        </NavLink>
        <NavLink
          to="/jokes"
          activeStyle={{
            fontWeight: "bold",
            background: "green"
          }}
        >
          {" "}
          See My Jokes{" "}
        </NavLink>
      </header>

      <Route path="/login" component={Login} />
      <Route path="/jokes" component={Jokes} />
    </>
  );
}

export default withRouter(App);
