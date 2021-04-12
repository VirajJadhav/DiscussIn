import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, RoomCard } from "../../components";
import { Container, Grid, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getRoomByStatus } from "../../redux/RoomRedux/action";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [
        // {
        //   title: "First Title",
        //   subTitle: "Topic Subtitle",
        //   description: "This is the description",
        //   author: "Author",
        //   date: "Today",
        // },
        // {
        //   title: "Second Title",
        //   subTitle: "Topic Subtitle",
        //   description: "This is the description",
        //   author: "Author",
        //   date: "Today",
        // },
        // {
        //   title: "Third Title",
        //   subTitle: "Topic Subtitle",
        //   description: "This is the description",
        //   author: "Author",
        //   date: "Today",
        // },
        // {
        //   title: "Fourth Title",
        //   subTitle: "Topic Subtitle",
        //   description: "This is the description",
        //   author: "Author",
        //   date: "Today",
        // },
      ],
      searchValue: "",
    };
  }
  async componentDidMount() {
    await this.props.getRoomByStatus("public");
    if (!this.props.roomReducer.error) {
      let newRooms = [];
      newRooms = this.props.roomReducer.payload.map((r, i) => {
        return {
          ...r,
          timestamp: this.returnDateFormat(r.createdAt || new Date()),
        };
      });
      this.setState({
        rooms: newRooms,
      });
    }
  }
  returnDateFormat = date => {
    const newDate = new Date(date);
    const result = newDate.toLocaleDateString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return result.split("-").join(" ") || result;
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { rooms, searchValue } = this.state;
    let newRooms = [];
    newRooms = rooms.filter(data => {
      return data.title.toLowerCase().includes(searchValue);
    });
    return (
      <div>
        <NavBar />

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
                  date={data.timestamp}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
