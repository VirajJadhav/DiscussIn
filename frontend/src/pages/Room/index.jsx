import React, { Component } from "react";
import { RoomLayout, InfoModal } from "../../components";

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </RoomLayout>
      </div>
    );
  }
}

export default Room;
