import React, { Component } from "react";
import { connect } from "react-redux";
import { getRoom, checkRoomUser } from "../../../redux/RoomRedux/action";
import { login } from "../../../redux/AuthRedux/action";
import { NavBar } from "../../../components";
import Form from "./form";

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: "",
      userName: "",
      password: "",
    };
  }
  async componentDidMount() {
    await this.props.clearRoomState();
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onSubmit = async event => {
    event.preventDefault();
    event.persist();

    const { roomID, userName, password } = this.state;
    const { roomReducer } = this.props;
    if (userName === "" && roomReducer.payload === "") {
      await this.props.getRoom(roomID);
      if (!this.props.roomReducer.loading && this.props.roomReducer.error) {
        alert(this.props.roomReducer.message);
      } else {
        this.props.history.push(`/join/${roomID}`);
      }
    } else {
      const data = {
        roomID,
        userName,
      };
      await this.props.checkRoomUser(data);
      if (!this.props.roomReducer.loading) {
        if (this.props.roomReducer.error) {
          alert(this.props.roomReducer.message);
        } else {
          const authData = {
            userName,
            password,
          };
          await this.props.login(authData);
          if (!this.props.authReducer.loading) {
            if (this.props.authReducer.error) {
              alert(this.props.authReducer.message);
            } else {
              this.props.history.push(`/join/${roomID}`);
            }
          }
        }
      }
    }
  };
  render() {
    const { roomID, userName, password } = this.state;
    return (
      <div>
        <NavBar />
        <Form
          roomID={roomID}
          userName={userName}
          password={password}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
        />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
