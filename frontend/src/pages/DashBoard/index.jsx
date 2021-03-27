import { Container, Grid } from "@material-ui/core";
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
      <Container>
        {/* <h1>Dashboard</h1>
        <Button color="primary" variant="contained">
          PRIMARY
        </Button>
        <br />
        <br />
        <Button color="secondary" variant="contained">
          SECONDARY
        </Button> */}
        <Grid container spacing={2}>
          <Grid item>
            <RoomCard></RoomCard>
          </Grid>
          <Grid item>
            <RoomCard></RoomCard>
          </Grid>
          <Grid item>
            <RoomCard></RoomCard>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <RoomCard></RoomCard>
          </Grid>
          <Grid item>
            <RoomCard></RoomCard>
          </Grid>
          <Grid item>
            <RoomCard></RoomCard>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default DashBoard;
