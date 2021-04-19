import React from "react";
import { FormBackground } from "../../../components";
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
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@material-ui/core";
import { MeetingRoom as RoomIcon, Add as AddIcon } from "@material-ui/icons";

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
    width: "99%", // Fix IE 11 issue.
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
  isLoggedIn,
  userName,
  title,
  subTitle,
  description,
  status,
  checkedUser,
  helperText,
  onSubmit,
  handleChange,
}) {
  const classes = useStyles();

  return (
    <div>
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
                <SmallAvatar alt="add">
                  <AddIcon
                    style={{
                      color: "black",
                    }}
                  />
                </SmallAvatar>
              }
            >
              <Avatar alt="Add room" className={classes.avatar}>
                <RoomIcon fontSize="large" />
              </Avatar>
            </Badge>
            <form onSubmit={onSubmit} className={classes.form}>
              {isLoggedIn ? null : (
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
                  helperText={"Please enter a guest name, if not registered !"}
                  autoComplete="discussin-userName"
                  autoFocus
                />
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={title}
                onChange={handleChange}
                id="title"
                label="Title"
                name="title"
                autoComplete="discussin-title"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={subTitle}
                onChange={handleChange}
                id="subTitle"
                label="Subtitle"
                name="subTitle"
                autoComplete="discussin-subTitle"
              />
              <TextField
                style={{
                  marginTop: "1rem",
                }}
                id="description"
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={handleChange}
                variant="outlined"
                autoComplete="discussin-description"
              />
              <FormControl
                style={{
                  marginTop: "1rem",
                }}
                fullWidth
              >
                <InputLabel id="discussin-room-status">Status</InputLabel>
                <Select
                  labelId="discussin-room-status"
                  id="discussin-room-status"
                  name="status"
                  value={status}
                  onChange={handleChange}
                  disabled={checkedUser}
                >
                  <MenuItem value={"public"}>Public</MenuItem>
                  <MenuItem value={"private"}>Private</MenuItem>
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                {checkedUser ? "Procced to Add ?" : "Add"}
              </Button>
              <Grid container direction="row" justify="center">
                <Grid item>
                  <Link
                    to="/joinRoom"
                    className={classes.Link}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {"Join other rooms ?"}
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
