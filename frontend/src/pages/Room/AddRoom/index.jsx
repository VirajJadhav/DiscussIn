import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "../../../components";
import Form from "./form";

class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subTitle: "",
      description: "",
      status: "public",
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

    console.log(this.state);
  };
  render() {
    const { title, subTitle, description, status } = this.state;
    return (
      <div>
        <NavBar />
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
    state,
  };
};

export default connect(mapStateToProps, {})(AddRoom);
