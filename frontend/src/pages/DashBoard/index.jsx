import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { RoomCard } from "/home/ron/RON/Sem 6/SE/DiscussIn/frontend/src/components/Card/index.jsx";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {/* <h1>Dashboard</h1>
        <Button color="primary" variant="contained">
          PRIMARY
        </Button>
        <br />
        <br />
        <Button color="secondary" variant="contained">
          SECONDARY
        </Button> */}
        <RoomCard></RoomCard>
      </div>
    );
  }
}

export default DashBoard;
