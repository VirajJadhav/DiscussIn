import { Grid } from "@material-ui/core";
import React, { Component } from "react";
// import { Button } from "@material-ui/core";
import { RoomCard } from "../../components";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {/* <Container> */}
        {/* <h1>Dashboard</h1>
        <Button color="primary" variant="contained">
          PRIMARY
        </Button>
        <br />
        <br />
        <Button color="secondary" variant="contained">
          SECONDARY
        </Button> */}
        <Grid container direction="row" justify="center" alignItems="center">
          {[...Array(10)].map(() => (
            <Grid item>
              <RoomCard></RoomCard>
            </Grid>
          ))}
        </Grid>
        {/* </Container> */}
      </div>
    );
  }
}

export default DashBoard;
