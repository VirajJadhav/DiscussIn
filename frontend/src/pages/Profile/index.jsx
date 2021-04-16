import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { NavBar, FullScreenDialog } from "../../components";
import ProfileLayout from "./Layout";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      open: false,
    };
  }
  handleDialog = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    const { open } = this.state;
    return (
      <div>
        <NavBar />
        <FullScreenDialog
          title="Private Rooms"
          open={open}
          handleDialog={this.handleDialog}
        >
          <Typography
            style={{
              textAlign: "center",
              margin: "1rem 0 1rem 0",
            }}
            variant="h6"
          >
            {`Private Rooms here`}
          </Typography>
        </FullScreenDialog>
        <ProfileLayout handleDialog={this.handleDialog}>
          <Typography variant="body1">{"Rooms will be here"}</Typography>
        </ProfileLayout>
      </div>
    );
  }
}

export default Profile;
