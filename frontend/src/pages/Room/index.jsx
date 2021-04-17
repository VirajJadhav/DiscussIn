import React, { Component } from "react";
import { connect } from "react-redux";
import { InfoModal, Loading, Message } from "../../components";
import RoomLayout from "./Layout";
import { getRoom } from "../../redux/RoomRedux/action";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomData: {},
      roomDataIndex: -1,
      users: [""],
      title: "",
      subTitle: "",
      description: "",
      createdAt: "",
      messageList: [],
      message: "",
      modalOpen: false,
      loading: true,
    };
    this.socketIO = global.config.socketIO;
    this.messagesEndRef = React.createRef();
    this.socketIO.on("chat-message", data => this.handleReceivedMessage(data));
    this.socketIO.on("room-data", data => this.handleRoomUsers(data));
  }
  async componentDidMount() {
    try {
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

      const socketIO = this.socketIO;

      const data = {
        roomID,
      };

      socketIO.emit("join-room", data);

      socketIO.on("join-message", data => {
        let prevList = [...this.state.messageList];
        prevList.push({
          message: data,
        });
        this.setState({
          messageList: prevList,
        });
      });

      socketIO.on("user-joined", data => {
        let prevList = [...this.state.messageList];
        prevList.push({
          message: data,
        });
        this.setState({
          messageList: prevList,
        });
      });

      socketIO.on("user-left", data => {
        let prevList = [...this.state.messageList];
        prevList.push({
          message: data,
        });
        this.setState({
          messageList: prevList,
        });
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({
        loading: !this.state.loading,
      });
      this.scrollToBottom();
    }
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentWillUnmount() {
    this.socketIO.close();
  }
  returnDateFormat = date => {
    let newDate = "";
    if (date === true) {
      newDate = new Date();
    } else {
      newDate = new Date(date);
    }
    const result = newDate.toLocaleDateString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return result.split("-").join(" ") || result;
  };
  returnTimeFormat = () => {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes();
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
      const messageDate =
        this.returnDateFormat(true) + " " + this.returnTimeFormat();
      prevList.push({
        position: "right",
        message: this.state.message,
        messageDate,
      });
      this.socketIO.emit("room-chat-message", {
        roomID: this.state.roomData.roomID,
        message: this.state.message,
        position: "left",
        messageDate,
      });
      this.setState({
        messageList: prevList,
        message: "",
      });
    }
  };
  handleReceivedMessage = data => {
    let prevList = [...this.state.messageList];
    prevList.push({
      position: data.position,
      message: data.message,
      messageDate: data.messageDate,
    });
    this.setState({
      messageList: prevList,
    });
  };

  handleRoomUsers = data => {
    let newUsers = data.map(user => user.userName);
    this.setState({
      users: newUsers,
    });
  };

  saveChat = event => {
    // console.log("saved chat");
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
      loading,
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
        {loading ? (
          <Loading
            isloading={loading}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}
          />
        ) : (
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
              if (data.messageDate === undefined) {
                return (
                  <div
                    key={index}
                    style={{
                      textAlign: "center",
                      margin: "0.8rem 0 0.8rem 0",
                    }}
                  >
                    &bull; {data.message} &bull;
                  </div>
                );
              } else {
                return (
                  <Message
                    key={index}
                    position={data.position}
                    message={data.message}
                    messageDate={data.messageDate}
                  />
                );
              }
            })}
          </RoomLayout>
        )}

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
