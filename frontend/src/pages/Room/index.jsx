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
      messageList: [
        {
          position: "right",
          message: "This message is from right",
          messageDate: "Fri Apr 10 22:00",
        },
        {
          position: "left",
          message: "This message is from left",
          messageDate: "Fri Apr 10 22:00",
        },
      ],
      message: "",
      modalOpen: false,
    };

    this.messagesEndRef = React.createRef();
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({
      behaviour: "smooth",
    });
  };
  handleInfoModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSendMessage = event => {
    if (this.state.message === "") {
      return;
    }
    if (
      (event.type === "keydown" && event.keyCode === 13) ||
      event.type === "click"
    ) {
      let prevList = [...this.state.messageList];
      prevList.push({
        position: "right",
        message: this.state.message,
        messageDate: "Fri Apr 10 22:00",
      });
      this.setState({
        messageList: prevList,
        message: "",
      });
    }
  };
  render() {
    const {
      users,
      title,
      subTitle,
      description,
      createdAt,
      modalOpen,
      messageList,
      message,
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
          message={message}
          handleInfoModal={this.handleInfoModal}
          handleSendMessage={this.handleSendMessage}
          handleChange={this.handleChange}
        >
          {messageList.map((data, index) => {
            return (
              <Message
                key={index}
                position={data.position}
                message={data.message}
                messageDate={data.messageDate}
              />
            );
          })}
        </RoomLayout>
        <div ref={this.messagesEndRef} />
      </div>
    );
  }
}

export default Room;
