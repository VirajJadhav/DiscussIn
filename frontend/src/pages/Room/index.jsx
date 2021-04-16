import React, { Component } from "react";
import { connect } from "react-redux";
import { InfoModal, Message } from "../../components";
import RoomLayout from "./Layout";
import { getRoom } from "../../redux/RoomRedux/action";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomData: {},
      roomDataIndex: -1,
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
  async componentDidMount() {
    const locArray = this.props.location.pathname.split("/");
    let roomID = "";
    if (locArray.length === 3) {
      roomID = locArray[2];
    }

    if (Array.isArray(this.props.roomReducer.payload) && roomID !== "") {
      let index = -1;
      for (let i = 0; i < this.props.roomReducer.payload.length; i++) {
        if (this.props.roomReducer.payload[i].roomID === roomID) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        let data = this.props.roomReducer.payload[index];
        this.setState({
          roomData: data,
          roomDataIndex: index,
          users: data.members,
          title: data.title,
          subTitle: data.subTitle,
          description: data.description,
          createdAt: data.timestamp,
        });
      }
    }
    if (roomID !== "" && this.state.roomDataIndex === -1) {
      await this.props.getRoom(roomID);
      let data = this.props.roomReducer.payload;
      if (typeof data === "object" && data !== null) {
        this.setState({
          roomData: data,
          users: data.members,
          title: data.title,
          subTitle: data.subTitle,
          description: data.description,
          createdAt: this.returnDateFormat(data.createdAt),
        });
      }
    }

    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  returnDateFormat = date => {
    const newDate = new Date(date);
    const result = newDate.toLocaleDateString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return result.split("-").join(" ") || result;
  };
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
  saveChat = event => {};

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
          saveChat={this.saveChat}
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

const mapStateToProps = state => {
  return {
    roomReducer: state.roomReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomID => dispatch(getRoom(roomID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
