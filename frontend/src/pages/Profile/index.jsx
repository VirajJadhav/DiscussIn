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
<<<<<<< HEAD
        <ProfileCard
          userName="Nagesh007"
          firstName="Nagesh"
          lastName="Nagshakti"
          email="nageshnagshakti@gmail.com"
          password="1234"
        />
=======
        <ProfileLayout>
          <Typography variant="body1">{"Rooms will be here"}</Typography>
        </ProfileLayout>
>>>>>>> aa4d7f117deb223846e68e196db3d8a68d5b6aaf
      </div>
    );
  }
}

export default Profile;
