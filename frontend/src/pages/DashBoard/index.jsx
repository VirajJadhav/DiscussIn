import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { RoomCard } from "../../components/RoomCard";

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
