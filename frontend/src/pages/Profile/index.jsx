import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserData, updateUser } from "../../redux/UserRedux/action";
import { getRoomUserNameStatus } from "../../redux/RoomRedux/action";
import { Container, TextField, Grid } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { NavBar, Loading, RoomCard } from "../../components";
import ProfileLayout from "./Layout";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      rooms: [],
      searchValue: "",
      open: false,
      loading: true,
      roomLoading: true,
    };
  }
  async componentDidMount() {
    let isMounted = true;
    try {
      const locArray = this.props.location.pathname.split("/");
      let userName = "";
      if (locArray.length === 3) {
        userName = locArray[2];
      }
      await this.props.getUserData(userName);
      const payload = this.props.userReducer.payload;
      if (
        !this.props.userReducer.loading &&
        typeof payload !== "string" &&
        payload.userName !== undefined
      ) {
        this.setState({
          user: payload,
          loading: false,
        });
        const data = {
          userName: payload.userName,
          status: "private",
        };
        await this.props.getRoomUserNameStatus(data);
        if (!this.props.roomReducer.loading) {
          this.setState({
            rooms: this.props.roomReducer.payload,
          });
        }
      } else {
        isMounted = false;
        alert("Invalid User Name !");
        this.props.history.replace("/login");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      if (isMounted) {
        this.setState({
          roomLoading: false,
          loading: false,
        });
      }
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleDialog = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  updateProfile = async data => {
    let newUserData = { ...this.state.user };
    newUserData["firstName"] = data.firstName;
    newUserData["lastName"] = data.lastName;
    newUserData["email"] = data.email;
    if (data.password) {
      newUserData["password"] = data.password;
    }

    await this.props.updateUser(newUserData);
    if (!this.props.userReducer.loading) {
      if (this.props.userReducer.error) {
        alert(this.props.userReducer.message);
      } else {
        this.setState({
          user: newUserData,
        });
      }
    }
  };
  render() {
    const { rooms, searchValue, open, user, loading, roomLoading } = this.state;
    let newRooms = [];
    newRooms = rooms.filter(data => {
      return data.title.toLowerCase().includes(searchValue);
    });
    return (
      <div>
        <NavBar />
        {loading ? (
          <Loading
            isloading={loading}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}
          />
        ) : (
          <ProfileLayout
            open={open}
            userData={user}
            handleDialog={this.handleDialog}
            updateProfile={this.updateProfile}
          >
            {roomLoading ? (
              <Loading
                isloading={roomLoading}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "4rem",
                }}
              />
            ) : (
              <div
                style={{
                  marginTop: "2rem",
                }}
              >
                <Container>
                  <TextField
                    name="searchValue"
                    onChange={this.handleChange}
                    fullWidth
                    placeholder="Search Title"
                    style={{
                      margin: "1rem 0 1rem 0",
                    }}
                    InputProps={{
                      endAdornment: <SearchIcon />,
                    }}
                  />
                </Container>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  {newRooms.map((data, index) => (
                    <Grid key={`room-${index}`} item>
                      <Link
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                        to={data.roomID ? `/join/${data.roomID}` : `/join/some`}
                      >
                        <RoomCard
                          title={data.title}
                          subTitle={data.subTitle}
                          description={data.description}
                          author={data.userName}
                          date={data.createdAt || new Date()}
                        />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </ProfileLayout>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    roomReducer: state.roomReducer,
    userReducer: state.userReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: userName => dispatch(getUserData(userName)),
    getRoomUserNameStatus: data => dispatch(getRoomUserNameStatus(data)),
    updateUser: data => dispatch(updateUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
