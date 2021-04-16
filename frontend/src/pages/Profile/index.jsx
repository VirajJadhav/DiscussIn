import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData } from "../../redux/AuthRedux/action";
import { Typography } from "@material-ui/core";
import { NavBar, FullScreenDialog } from "../../components";
import ProfileLayout from "./Layout";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      open: false,
      loading: true,
    };
  }
  async componentDidMount() {
    try {
      const locArray = this.props.location.pathname.split("/");
      let userName = "";
      if (locArray.length === 3) {
        userName = locArray[2];
      }
      await this.props.getUserData(userName);
      this.setState({
        user: this.props.authReducer.payload,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({
        loading: !this.state.loading,
      });
    }
  }
  handleDialog = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    const { open } = this.state;
    return (
      <div>
        <NavBar />
        <FullScreenDialog
          title="Private Rooms"
          open={open}
          handleDialog={this.handleDialog}
        >
          <Typography
            style={{
              textAlign: "center",
              margin: "1rem 0 1rem 0",
            }}
            variant="h6"
          >
            {`Private Rooms here`}
          </Typography>
        </FullScreenDialog>
        <ProfileLayout handleDialog={this.handleDialog}>
          <Typography variant="body1">{"Rooms will be here"}</Typography>
        </ProfileLayout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    roomReducer: state.roomReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: userName => dispatch(getUserData(userName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
