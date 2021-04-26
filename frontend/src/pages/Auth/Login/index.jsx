import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../redux/AuthRedux/action";
import {
  showSuccess,
  showError,
} from "../../../redux/NotificationRedux/action";
import { NavBar, FormBackground, Footer } from "../../../components";
import Form from "./form";
import { LoginSchema } from "../../../validation";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
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

    this.setState({
      loading: true,
    });

    const { userName, password } = this.state;

    const data = {
      userName,
      password,
    };

    try {
      await LoginSchema.validate(data);
      await this.props.login(data);

      if (!this.props.authReducer.loading) {
        this.setState({
          loading: false,
        });
        if (this.props.authReducer.error) {
          this.props.showError(this.props.authReducer.message);
        } else {
          const userName = this.props.authReducer.payload.userName;
          this.props.showSuccess(`Welcome, ${userName}`);
          this.props.history.push("/");
        }
      }
    } catch (error) {
      this.props.showError(error.message);
      this.setState({
        loading: false,
      });
    }
  };
  render() {
    const { userName, password, loading } = this.state;
    return (
      <div>
        <NavBar />
        <FormBackground>
          <Form
            userName={userName}
            password={password}
            loading={loading}
            handleChange={this.handleChange}
            onSubmit={this.onSubmit}
          />
        </FormBackground>
        <Footer height="37vh" />
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
    login: data => dispatch(login(data)),
    showSuccess: message => dispatch(showSuccess(message)),
    showError: message => dispatch(showError(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
