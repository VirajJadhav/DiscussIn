import React, { Component } from "react";
import { NavBar } from "../../components";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <NavBar />
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default DashBoard;
