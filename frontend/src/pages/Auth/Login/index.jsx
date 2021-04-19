import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../redux/AuthRedux/action";
import { NavBar, FormBackground, Footer } from "../../../components";
import Form from "./form";
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

    await this.props.login(data);

    if (!this.props.authReducer.loading) {
      this.setState({
        loading: false,
      });
      if (this.props.authReducer.error) {
        alert(this.props.authReducer.message);
      } else {
        // const userName = this.props.authReducer.payload.userName;
        this.props.history.push("/");
        // this.props.history.push(`/profile/${userName}`);
      }
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
        <Footer />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
