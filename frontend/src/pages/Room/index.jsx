import React, { Component } from "react";
import { RoomLayout, InfoModal, Message } from "../../components";

class Room extends Component {
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
    // console.log(new Date());
  }
  handleInfoModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  render() {
    const {
      users,
      title,
      subTitle,
      description,
      createdAt,
      modalOpen,
    } = this.state;
    return (
      <div>
        <InfoModal
          open={modalOpen}
          handleInfoModal={this.handleInfoModal}
          title={title}
          subTitle={subTitle}
          description={description}
        />

        <RoomLayout
          users={users}
          title={title}
          createdAt={createdAt}
          handleInfoModal={this.handleInfoModal}
        >
          <Message
            position="right"
            message="This message is from right"
            messageDate="Fri Apr 10 22:00"
          />
          <Message
            position="left"
            message="This message is from left"
            messageDate="Fri Apr 10 22:00"
          />
        </RoomLayout>
      </div>
    );
  }
}

export default Room;
