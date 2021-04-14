import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { NavBar } from "../../components";
import ProfileLayout from "./Layout";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  handleInfoModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  render() {
    return (
      <div>
        <NavBar />
        <ProfileLayout>
          <Typography variant="body1">{"Rooms will be here"}</Typography>
        </ProfileLayout>
        <ProfileLayout>
          <Typography variant="body1">{"Rooms will be here"}</Typography>
        </ProfileLayout>
      </div>
    );
  }
}

export default Profile;
