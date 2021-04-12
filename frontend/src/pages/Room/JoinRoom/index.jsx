import React, { Component } from "react";
import { connect } from "react-redux";
import { getRoom } from "../../../redux/RoomRedux/action";
import { NavBar } from "../../../components";
import Form from "./form";

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: "",
      userName: "",
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onSubmit = event => {
    event.preventDefault();
    event.persist();

    const { roomID, userName } = this.state;
    const { roomReducer } = this.props;
    if (userName === "" && roomReducer.payload === "") {
      this.props.getRoom(roomID);
    }
  };
  render() {
    const { roomID, userName } = this.state;
    return (
      <div>
        <NavBar />
        <Form
          roomID={roomID}
          userName={userName}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomID => dispatch(getRoom(roomID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
