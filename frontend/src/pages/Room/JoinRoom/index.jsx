import React, { Component } from "react";
import { connect } from "react-redux";
import { getRoom, checkRoomUser } from "../../../redux/RoomRedux/action";
import { showError } from "../../../redux/NotificationRedux/action";
import { login } from "../../../redux/AuthRedux/action";
import { NavBar, Footer } from "../../../components";
import Form from "./form";
import { LoginSchema } from "../../../validation";

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: "",
      userName: "",
      password: "",
      isPrivate: false,
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onSubmit = async event => {
    event.preventDefault();
    event.persist();

    await this.props.clearRoomState();

    const { roomID, userName, password } = this.state;
    if (userName === "" && this.props.roomReducer.payload === "") {
      await this.props.getRoom(roomID);
      if (!this.props.roomReducer.loading && this.props.roomReducer.error) {
        this.props.showError(this.props.roomReducer.message);
      } else if (
        this.props.roomReducer.payload !== "" &&
        this.props.roomReducer.payload.status === "private"
      ) {
        this.setState({
          isPrivate: true,
        });
      } else {
        this.props.history.push(`/join/${roomID}`);
      }
    } else {
      try {
        await LoginSchema.validate({ userName, password });
        const authData = {
          userName,
          password,
        };
        await this.props.login(authData);
        if (!this.props.authReducer.loading) {
          if (this.props.authReducer.error) {
            this.props.showError(this.props.authReducer.message);
          } else {
            this.props.history.push(`/join/${roomID}`);
          }
        }
      } catch (error) {
        this.props.showError(error.message);
      }
    }
  };
  render() {
    const { roomID, userName, password, isPrivate } = this.state;
    return (
      <div>
        <NavBar />
        <Form
          roomID={roomID}
          userName={userName}
          password={password}
          isPrivate={isPrivate}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
        />
        {isPrivate ? <Footer height="24vh" /> : <Footer height="38vh" />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    roomReducer: state.roomReducer,
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomID => dispatch(getRoom(roomID)),
    checkRoomUser: data => dispatch(checkRoomUser(data)),
    login: data => dispatch(login(data)),
    clearRoomState: () =>
      dispatch({
        type: "CLEAR_STATE",
      }),
    showError: message => dispatch(showError(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
