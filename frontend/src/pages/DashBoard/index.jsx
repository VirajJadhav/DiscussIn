import React, { Component } from "react";
import { NavBar, RoomCard } from "../../components";
import { Container, Grid, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [
        {
          title: "First Title",
          subTitle: "Topic Subtitle",
          description: "This is the description",
          author: "Author",
          date: "Today",
        },
        {
          title: "Second Title",
          subTitle: "Topic Subtitle",
          description: "This is the description",
          author: "Author",
          date: "Today",
        },
        {
          title: "Third Title",
          subTitle: "Topic Subtitle",
          description: "This is the description",
          author: "Author",
          date: "Today",
        },
        {
          title: "Fourth Title",
          subTitle: "Topic Subtitle",
          description: "This is the description",
          author: "Author",
          date: "Today",
        },
      ],
      searchValue: "",
    };
  }
  joinRoom = () => {
    this.props.history.push("/join");
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
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={this.joinRoom}
              >
                <RoomCard
                  title={data.title}
                  subTitle={data.subTitle}
                  description={data.description}
                  author={data.author}
                  date={data.date}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default DashBoard;
