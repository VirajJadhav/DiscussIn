import React, { Component } from "react";
import { connect } from "react-redux";
import { InfoModal, Loading, Message } from "../../components";
import RoomLayout from "./Layout";
import { getRoom } from "../../redux/RoomRedux/action";
import { saveMessageChat } from "../../redux/MessageRedux/action";
import io from "socket.io-client";
import { Redirect } from "react-router";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomData: {},
      roomDataIndex: -1,
      users: [],
      title: "",
      subTitle: "",
      description: "",
      createdAt: "",
      messageList: [],
      message: "",
      modalOpen: false,
      loading: true,
      redirect: false,
    };
    this.socketIO = null;
    this.messagesEndRef = React.createRef();
  }
  async componentDidMount() {
    let isMounted = true;
    try {
      const locArray = this.props.location.pathname.split("/");
      let roomID = "";
      if (locArray.length === 3) {
        roomID = locArray[2];
      }

      let index = -1;

      if (Array.isArray(this.props.roomReducer.payload)) {
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
            title: data.title,
            subTitle: data.subTitle,
            description: data.description,
            createdAt: data.timestamp,
          });
        }
      }
      if (index === -1) {
        await this.props.getRoom(roomID);
        let data = this.props.roomReducer.payload;
        if (typeof data === "object" && data !== null) {
          index = 0;
          this.setState({
            roomData: data,
            title: data.title,
            subTitle: data.subTitle,
            description: data.description,
            createdAt: this.returnDateFormat(data.createdAt),
          });
        }
      }

      if (index) {
        isMounted = false;
        this.setState({
          redirect: true,
        });
      } else {
        this.socketIO = io.connect(global.config.socketURL);

        const socketIO = this.socketIO;

        const data = {
          roomID,
        };

        socketIO.emit("join-room", data);

        socketIO.on("chat-message", data => {
          this.handleReceivedMessage(data);
        });

        socketIO.on("room-data", data => {
          this.handleRoomUsers(data);
        });

        socketIO.on("join-message", data => {
          let prevList = [...this.state.messageList];
          const messageDate =
            this.returnDateFormat(true) + " " + this.returnTimeFormat();
          prevList.push({
            message: data,
            messageDate,
          });
          this.setState({
            messageList: prevList,
          });
        });

        socketIO.on("user-joined", data => {
          let prevList = [...this.state.messageList];
          const messageDate =
            this.returnDateFormat(true) + " " + this.returnTimeFormat();
          prevList.push({
            message: data,
            messageDate,
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
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      if (isMounted) {
        this.setState({
          loading: !this.state.loading,
        });
        this.scrollToBottom();
      }
    }
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentWillUnmount() {
    try {
      if (this.socketIO) {
        this.socketIO.close();
      }
    } catch (error) {
      console.log(error.message);
    }
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
    if (this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView({
        behaviour: "smooth",
      });
    }
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

  saveChat = async () => {
    let messageList = this.state.messageList.map((message, index) => {
      return {
        ...message,
        roomID: this.state.roomData.roomID,
      };
    });

    // TODO: logic for only author allowed to save chat

    await this.props.saveMessageChat(messageList);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/addRoom" />;
    }
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
      roomData,
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
            status={roomData.status}
            createdAt={createdAt}
            message={message}
            handleInfoModal={this.handleInfoModal}
            handleSendMessage={this.handleSendMessage}
            handleChange={this.handleChange}
            saveChat={this.saveChat}
          >
            {messageList.map((data, index) => {
              if (data.position === undefined) {
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
    messageReducer: state.messageReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomID => dispatch(getRoom(roomID)),
    saveMessageChat: messageList => dispatch(saveMessageChat(messageList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
