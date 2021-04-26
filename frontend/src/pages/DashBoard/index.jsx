import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar, RoomCard, Loading } from "../../components";
import { Container, Grid, TextField, Typography } from "@material-ui/core";
import {
  Search as SearchIcon,
  SentimentVeryDissatisfied as SadIcon,
} from "@material-ui/icons";
import { showInfo, showError } from "../../redux/NotificationRedux/action";
import { getRoomByStatus } from "../../redux/RoomRedux/action";
import io from "socket.io-client";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      searchValue: "",
      loading: true,
    };
    this.socketIO = null;
  }
  async componentDidMount() {
    try {
      await this.props.getRoomByStatus("public");
      if (!this.props.roomReducer.error) {
        this.setState({
          rooms: this.props.roomReducer.payload,
        });
      }
      const socketURL = global.config.socketURL;
      this.socketIO = io.connect(`${socketURL}`);
      this.socketIO.on("room-delete", data => this.handleRoomDelete(data));
    } catch (error) {
      this.props.showError(error.message);
    } finally {
      this.setState({
        loading: !this.state.loading,
      });
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleRoomDelete = data => {
    if (!data.error) {
      const roomID = data.roomID;
      const newRooms = this.state.rooms.filter(room => room.roomID !== roomID);
      this.setState({
        rooms: newRooms,
      });
      this.props.showInfo(`Rooms updated !`);
    }
  };
  render() {
    const { rooms, searchValue, loading } = this.state;
    let newRooms = [];
    newRooms = rooms.filter(data => {
      return data.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    return (
      <div>
        <NavBar />

        {loading ? (
          <Loading
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
            isloading={loading}
          />
        ) : (
          <div>
            <Container maxWidth="md">
              {rooms !== undefined && rooms.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography
                      style={{
                        marginRight: "1rem",
                      }}
                      variant="h4"
                    >
                      {"No Rooms"}
                    </Typography>
                    <SadIcon fontSize="large" />
                  </div>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to="/addRoom"
                  >
                    Create new room ?
                  </Link>
                </div>
              ) : (
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
              )}
            </Container>
            <Container maxWidth="xl">
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                {newRooms.map((data, index) => (
                  <Grid key={`room-${index}`} item>
                    <RoomCard
                      title={data.title}
                      link={data.roomID ? `/join/${data.roomID}` : `/addRoom`}
                      subTitle={data.subTitle}
                      description={data.description}
                      author={data.userName}
                      status={data.status}
                      date={data.createdAt || new Date()}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        )}
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
    getRoomByStatus: status => dispatch(getRoomByStatus(status)),
    showInfo: message => dispatch(showInfo(message)),
    showError: message => dispatch(showError(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
