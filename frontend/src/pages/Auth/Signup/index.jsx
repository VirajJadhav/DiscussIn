import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../../redux/AuthRedux/action";
import {
  showSuccess,
  showError,
} from "../../../redux/NotificationRedux/action";
import { NavBar, FormBackground, Footer } from "../../../components";
import Form from "./form";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confPassword: "",
      loading: false,
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

    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      confPassword,
    } = this.state;

    if (password !== confPassword) {
      this.props.showError("Passwords don't match !");
      return;
    }

    const data = {
      userName,
      firstName,
      lastName,
      email,
      password,
    };

    await this.props.register(data);

    if (!this.props.authReducer.loading) {
      if (this.props.authReducer.error) {
        this.props.showError(this.props.authReducer.message);
      } else {
        this.props.showSuccess(`${userName}, You are registered !`);
        this.props.history.push("/login");
      }
    }
  };
  render() {
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      confPassword,
    } = this.state;
    return (
      <div>
        <NavBar />
        <FormBackground>
          <Form
            userName={userName}
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            confPassword={confPassword}
            handleChange={this.handleChange}
            onSubmit={this.onSubmit}
          />
        </FormBackground>
        <Footer height="15vh" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: data => dispatch(register(data)),
    showSuccess: message => dispatch(showSuccess(message)),
    showError: message => dispatch(showError(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
