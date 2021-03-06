import React from "react";
import { useSelector } from "react-redux";
import { NavBar, FormBackground } from "../../../components";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  makeStyles,
  Container,
  Badge,
  withStyles,
} from "@material-ui/core";
import {
  MeetingRoom as RoomIcon,
  TransitEnterexit as EnterIcon,
} from "@material-ui/icons";

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    color: "black",
    backgroundColor: "whitesmoke",
    padding: theme.spacing(1.2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
  Link: {
    color: theme.palette.darkSlateBlue.main,
  },
}));

function Form({
  roomID,
  userName,
  password,
  isPrivate,
  onSubmit,
  handleChange,
}) {
  const classes = useStyles();

  const state = useSelector(state => state.roomReducer);

  return (
    <div>
      <NavBar />
      <FormBackground>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <SmallAvatar alt="join">
                  <EnterIcon
                    style={{
                      color: "black",
                    }}
                  />
                </SmallAvatar>
              }
            >
              <Avatar alt="Join room" className={classes.avatar}>
                <RoomIcon fontSize="large" />
              </Avatar>
            </Badge>
            <form onSubmit={onSubmit} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={roomID}
                onChange={handleChange}
                id="roomID"
                label="Room ID"
                name="roomID"
                type="password"
                autoFocus
                autoComplete="discussin-roomID"
              />
              {isPrivate ? (
                <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={userName}
                    onChange={handleChange}
                    id="userName"
                    label="Username"
                    name="userName"
                    helperText={
                      "This room is private. Please enter your username or register on DiscussIn !"
                    }
                    autoComplete="discussin-userName"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={password}
                    onChange={handleChange}
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="discussin-password"
                  />
                </div>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={state.loading}
              >
                Join
              </Button>
              <Grid container direction="row" justify="center">
                <Grid item>
                  <Link
                    to="/addRoom"
                    className={classes.Link}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {"Create new room ?"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </FormBackground>
    </div>
  );
}

export default Form;
