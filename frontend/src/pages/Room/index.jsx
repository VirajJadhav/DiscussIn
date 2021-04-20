import React, { Component } from "react";
import { connect } from "react-redux";
import {
  InfoModal,
  Loading,
  Message,
  FormDialog,
  CopyModal,
  FullScreenDialog,
} from "../../components";
import RoomLayout from "./Layout";
import { getRoom } from "../../redux/RoomRedux/action";
import {
  saveMessageChat,
  getSavedMessages,
  clearChatMessages,
} from "../../redux/MessageRedux/action";
import io from "socket.io-client";
import { Redirect } from "react-router";
import { verifyUser } from "../../util";
import RichTextEditor from "react-rte";
class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Guest User",
      guestName: "Guest User",
      userIsValid: false,
      roomData: {},
      users: [],
      title: "",
      subTitle: "",
      description: "",
      createdAt: "",
      messageList: [],
      message: "",
      editorOpen: false,
      openCopy: false,
      modalOpen: false,
      dialogOpen: false,
      loading: true,
      redirectAdd: false,
      redirectJoin: false,
      redirectLogin: false,
      editorValue: RichTextEditor.createEmptyValue(),
    };
    this.socketIO = null;
    this.messagesEndRef = React.createRef();
  }
  async componentDidMount() {
    let isMounted = true,
      userName = "",
      isPrivate;
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
          isPrivate = data.status === "private";
          this.setState({
            roomData: data,
            title: data.title,
            userName: data.userName,
            subTitle: data.subTitle,
            description: data.description,
            createdAt: this.returnDateFormat(data.createdAt),
          });
        }
      }
      if (index === -1) {
        await this.props.getRoom(roomID);
        let data = this.props.roomReducer.payload;
        if (typeof data === "object" && data !== null) {
          index = 0;
          userName = data.userName;
          isPrivate = data.status === "private";
          this.setState({
            roomData: data,
            title: data.title,
            subTitle: data.subTitle,
            description: data.description,
            userName: data.userName,
            createdAt: this.returnDateFormat(data.createdAt),
          });
        }
      }

      if (index === -1) {
        isMounted = false;
        this.setState({
          redirectAdd: true,
        });
      } else {
        let foundUser = false;
        try {
          const result = await verifyUser(this.props.authReducer);

          if (result.isLoggedIn) {
            foundUser = true;
            userName = result.userName;
            this.setState({
              userIsValid: true,
              userName: result.userName,
            });
          } else if (!result.isLoggedIn && isPrivate) {
            isMounted = false;
            this.setState({
              redirectJoin: true,
            });
            return;
          }
        } catch (error) {
          if (isPrivate) {
            isMounted = false;
            this.setState({
              redirectJoin: true,
            });
            return;
          }
        }

        try {
          if (isPrivate) {
            await this.props.getSavedMessages(roomID);
            if (!this.props.messageReducer.loading) {
              if (this.props.messageReducer.error) {
                alert(this.props.messageReducer.message);
              } else {
                let prevMessages = this.props.messageReducer.payload;
                prevMessages.sort((a, b) =>
                  a.messageDate > b.messageDate ? 1 : -1
                );
                this.setState({
                  messageList: prevMessages,
                });
              }
            }
          }
        } catch (error) {
          console.log(error.message);
        }

        this.socketIO = io.connect(global.config.socketURL);

        const guestUser = sessionStorage.getItem("guestdiscussin");

        if (foundUser) {
          const data = {
            roomID,
            userName,
            status: isPrivate ? "private" : "public",
          };
          this.socketIO.emit("join-room", data);
        } else if (!guestUser) {
          this.setState({
            dialogOpen: true,
          });
        } else if (guestUser) {
          const data = {
            roomID,
            userName: guestUser,
            status: isPrivate ? "private" : "public",
          };
          this.socketIO.emit("join-room", data);
        } else {
          isMounted = false;
          this.setState({
            redirectLogin: true,
          });
          return;
        }

        this.initSocketListeners();
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
  initSocketListeners = () => {
    const socketIO = this.socketIO;
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

    socketIO.on("editor-data", data => this.onRecieve(data));

    socketIO.on("user-left", data => {
      let prevList = [...this.state.messageList];
      prevList.push({
        message: data,
      });
      this.setState({
        messageList: prevList,
      });
    });
  };
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
  handleFormDialog = () => {
    if (this.state.guestName === "") {
      alert("Please provide a guest name");
      return;
    }
    this.setState({
      dialogOpen: !this.state.dialogOpen,
    });
    const data = {
      roomID: this.state.roomData.roomID,
      userName: this.state.guestName,
      status: "public",
    };
    sessionStorage.setItem("guestdiscussin", this.state.guestName);
    this.socketIO.emit("join-room", data);
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
        userName: this.state.userName,
      });
      this.socketIO.emit("room-chat-message", {
        roomID: this.state.roomData.roomID,
        message: this.state.message,
        position: "left",
        messageDate,
        userName: this.state.userName,
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
      userName: data.userName,
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

  handleCopyModal = clear => {
    this.setState({
      openCopy: !this.state.openCopy,
    });
  };

  handleCopy = () => {
    alert("Room ID copied");
    this.handleCopyModal();
  };

  saveChat = async () => {
    let messageList = this.state.messageList.map((message, index) => {
      return {
        ...message,
        roomID: this.state.roomData.roomID,
      };
    });

    await this.props.saveMessageChat(messageList);
    if (!this.props.messageReducer.loading) {
      if (this.props.messageReducer.error) {
        alert(this.props.messageReducer.message);
      } else {
        alert("chat saved");
      }
    }
  };

  clearChat = async () => {
    await this.props.clearChatMessages(this.state.roomData.roomID);
    if (!this.props.messageReducer.loading) {
      if (this.props.messageReducer.error) {
        alert(this.props.messageReducer.message);
      } else {
        this.setState({
          messageList: [],
        });
        alert("chat cleared");
      }
    }
  };

  handleEditor = () => {
    this.setState({
      editorOpen: !this.state.editorOpen,
    });
  };

  onRecieve = data => {
    const editorData = RichTextEditor.createValueFromString(
      data.data,
      "markdown"
    );
    this.setState({
      editorValue: editorData,
    });
  };

  onChange = value => {
    this.setState({
      editorValue: value,
    });
    const data = {
      roomID: this.state.roomData.roomID,
      data: value.toString("markdown"),
    };
    this.socketIO.emit("room-editor-data", data);
  };

  render() {
    if (this.state.redirectAdd) {
      return <Redirect to="/addRoom" />;
    }
    if (this.state.redirectJoin) {
      return <Redirect to="/joinRoom" />;
    }
    if (this.state.redirectLogin) {
      return <Redirect to="/login" />;
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
      userName,
      dialogOpen,
      guestName,
      openCopy,
      editorValue,
      editorOpen,
    } = this.state;
    return (
      <div>
        <CopyModal
          open={openCopy}
          roomID={roomData.roomID}
          handleCopyModal={this.handleCopyModal}
          handleCopy={this.handleCopy}
        />
        <FormDialog
          open={dialogOpen}
          guestName={guestName}
          handleChange={this.handleChange}
          handleFormDialog={this.handleFormDialog}
        />
        <InfoModal
          open={modalOpen}
          handleInfoModal={this.handleInfoModal}
          title={title}
          subTitle={subTitle}
          description={description}
          status={roomData.status}
        />
        <FullScreenDialog
          title="Notepad"
          handleDialog={this.handleEditor}
          open={editorOpen}
        >
          <div
            style={{
              marginTop: "3rem",
              width: "95%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <RichTextEditor
              key={roomData.roomID}
              value={editorValue}
              onChange={this.onChange}
            />
          </div>
        </FullScreenDialog>
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
            userIsValid={userName === roomData.userName}
            createdAt={createdAt}
            message={message}
            handleInfoModal={this.handleInfoModal}
            handleSendMessage={this.handleSendMessage}
            handleChange={this.handleChange}
            saveChat={this.saveChat}
            clearChat={this.clearChat}
            handleCopyModal={this.handleCopyModal}
            handleEditor={this.handleEditor}
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
                    sender={data.userName}
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
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomID => dispatch(getRoom(roomID)),
    saveMessageChat: messageList => dispatch(saveMessageChat(messageList)),
    getSavedMessages: roomID => dispatch(getSavedMessages(roomID)),
    clearChatMessages: roomID => dispatch(clearChatMessages(roomID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
