import React, { Component } from "react";
import { connect } from "react-redux";
import { addRoom } from "../../../redux/RoomRedux/action";
import { NavBar } from "../../../components";
import Form from "./form";
import CopyModal from "./CopyModal";

class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      title: "",
      subTitle: "",
      description: "",
      status: "public",
      copyOpen: false,
      roomID: "",
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleCopyModal = () => {
    this.setState({
      copyOpen: !this.state.copyOpen,
    });
  };
  handleCopy = () => {
    this.props.clearState();
    this.handleCopyModal();
    this.props.history.push("/joinRoom");
  };
  onSubmit = event => {
    event.preventDefault();
    event.persist();

    const { userName, title, subTitle, description, status } = this.state;

    const data = {
      userName,
      title,
      subTitle,
      description,
      status,
    };

    const response = this.props.addRoom(data);
    response
      .then(() => {
        if (!this.props.roomReducer.loading) {
          this.setState({
            roomID: this.props.roomReducer.payload.roomID,
          });
          this.handleCopyModal();
        }
      })
      .catch(error => console.log(error.message));
  };

  render() {
    const {
      title,
      subTitle,
      description,
      status,
      copyOpen,
      roomID,
    } = this.state;
    return (
      <div>
        <NavBar />
        <CopyModal
          open={copyOpen}
          roomID={roomID}
          handleCopyModal={this.handleCopyModal}
          handleCopy={this.handleCopy}
        />
        <Form
          title={title}
          subTitle={subTitle}
          description={description}
          status={status}
          onSubmit={this.onSubmit}
          handleChange={this.handleChange}
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

const mapDispatchToprops = dispatch => {
  return {
    addRoom: data => dispatch(addRoom(data)),
    clearState: () =>
      dispatch({
        type: "CLEAR_STATE",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(AddRoom);
