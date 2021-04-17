import React, { Component } from "react";
import { connect } from "react-redux";
import { addRoom } from "../../../redux/RoomRedux/action";
import { checkUser } from "../../../redux/UserRedux/action";
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
      checkedUser: false,
      helperText: "",
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleCopyModal = clear => {
    if (clear) {
      this.setState({
        userName: "",
        title: "",
        subTitle: "",
        description: "",
        status: "public",
        copyOpen: false,
        roomID: "",
        checkedUser: false,
        helperText: "",
      });
    } else {
      this.setState({
        copyOpen: !this.state.copyOpen,
      });
    }
  };
  handleCopy = () => {
    this.props.clearState();
    this.handleCopyModal();
    this.props.history.push("/joinRoom");
  };
  onSubmit = async event => {
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

    if (status === "private" && !this.state.checkedUser) {
      await this.props.checkUser(userName);
      if (!this.props.userReducer.payload) {
        this.setState({
          status: "public",
          helperText: "You are not registered. You can add only public rooms.",
          checkedUser: true,
        });
      } else {
        await this.props.addRoom(data);
        if (!this.props.roomReducer.loading) {
          this.setState({
            roomID: this.props.roomReducer.payload.roomID,
          });
          this.handleCopyModal();
        }
      }
    } else {
      await this.props.addRoom(data);
      if (!this.props.roomReducer.loading) {
        this.setState({
          roomID: this.props.roomReducer.payload.roomID,
        });
        this.handleCopyModal();
      }
    }
  };

  render() {
    const {
      userName,
      title,
      subTitle,
      description,
      status,
      copyOpen,
      roomID,
      checkedUser,
      helperText,
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
          checkedUser={checkedUser}
          userName={userName}
          helperText={helperText}
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
    authReducer: state.authReducer,
    userReducer: state.userReducer,
  };
};

const mapDispatchToprops = dispatch => {
  return {
    addRoom: data => dispatch(addRoom(data)),
    checkUser: userName => dispatch(checkUser(userName)),
    clearState: () =>
      dispatch({
        type: "CLEAR_STATE",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(AddRoom);
