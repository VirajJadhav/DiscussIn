import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "../../../components";

class JoinRoom extends Component {
  render() {
    return (
      <div>
        <NavBar />
        This is join room
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
  };
};

export default connect(mapStateToProps, {})(JoinRoom);
