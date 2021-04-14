import React, { Component } from "react";
import { NavBar, ProfileCard } from "../../components";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ["User 1", "User 2", "User 3", "User 4"],
      title: "This is the title",
      subTitle: "This is the sub-title",
      description: "This is the description",
      createdAt: "Thu Apr 8 2021",

      modalOpen: false,
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
        <ProfileCard
          userName="Nagesh007"
          firstName="Nagesh"
          lastName="Nagshakti"
          email="nageshnagshakti@gmail.com"
          password="1234"
        />
      </div>
    );
  }
}

export default Profile;
