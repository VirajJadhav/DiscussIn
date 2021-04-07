import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { NavBar, RoomCard } from "../../components";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  joinRoom = () => {
    this.props.history.push("/join");
  };
  render() {
    return (
      <div>
        <NavBar />
        <Grid container direction="row" justify="center" alignItems="center">
          {[...Array(4)].map((data, index) => (
            <Grid key={`room-${index}`} item>
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={this.joinRoom}
              >
                <RoomCard />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default DashBoard;
