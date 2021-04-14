import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  makeStyles,
  Typography,
  Container,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "30rem",
    height: "auto",
    borderRadius: "1rem",
    margin: "0.6rem",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    width: "8rem",
    height: "8rem",
    backgroundColor: theme.palette.iceCold.main,
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
  infoTitle: {
    fontSize: "0.8rem",
    marginLeft: "1px",
    marginTop: "1rem",
    color: theme.palette.greyBlueShade.main,
  },
  info: {
    fontSize: "1.3rem",
  },
  userName: {
    fontSize: "2.6rem",
    fontWeight: 600,
  },
}));

export default function ProfileCard({
  userName,
  firstName,
  lastName,
  email,
  password,
}) {
  const classes = useStyles();

  const [newPassword, setnewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    if (resetPassOpen) {
      if (newPassword === confPassword) {
        event.persist();
      } else {
        console.log("Confirm password not matched!!");
      }
    }

    console.log(userName, password);
  };

  const [updateProfOpen, setUpdateProfOpen] = useState(false);

  const handelUpdateProfOpen = () => {
    setUpdateProfOpen(prevState => !prevState);
    setResetPassOpen(false);
  };

  const [resetPassOpen, setResetPassOpen] = useState(false);

  const handleResetPassform = () => {
    setResetPassOpen(prevState => !prevState);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Grid item xs={12}>
              <Typography
                className={classes.userName}
                component="h1"
                variant="h3"
                noWrap
              >
                {userName}
              </Typography>
            </Grid>
            <br></br>
            <div
              className={classes.form}
              style={{ display: updateProfOpen ? "none" : "block" }}
            >
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Typography
                    className={classes.infoTitle}
                    variant="caption"
                    component="h4"
                    noWrap
                  >
                    {"First Name :"}
                  </Typography>
                  <Typography
                    className={classes.info}
                    variant="h6"
                    component="h2"
                    noWrap
                  >
                    {firstName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    className={classes.infoTitle}
                    variant="caption"
                    component="h4"
                    noWrap
                  >
                    {"Last Name :"}
                  </Typography>
                  <Typography
                    className={classes.info}
                    variant="h6"
                    component="h2"
                    noWrap
                  >
                    {lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography
                    className={classes.infoTitle}
                    variant="caption"
                    component="h4"
                    noWrap
                  >
                    {"Email Address :"}
                  </Typography>
                  <Typography
                    className={classes.info}
                    variant="h6"
                    component="h2"
                    noWrap
                  >
                    {email}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                onClick={handelUpdateProfOpen}
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Update Profile
              </Button>
            </div>
            <form
              onSubmit={onSubmit}
              className={classes.form}
              noValidate
              style={{ display: updateProfOpen ? "block" : "none" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={firstName}
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="discussin-firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={lastName}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="discussin-lastName"
                  />
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="discussin-email"
              />
              <Grid container direction="row" justify="center">
                <Grid item>
                  <Link
                    onClick={handleResetPassform}
                    className={classes.Link}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {resetPassOpen ? "Cancel Reset Password" : "Reset Password"}
                  </Link>
                </Grid>
              </Grid>
              <div style={{ display: resetPassOpen ? "block" : "none" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={newPassword}
                  onChange={event => setnewPassword(event.target.value)}
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  type="password"
                  autoComplete="discussin-newPassword"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={confPassword}
                  onChange={event => setConfPassword(event.target.value)}
                  id="confPassword"
                  label="Confirm Password"
                  name="confPassword"
                  type="password"
                  autoComplete="discussin-confPassword"
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Save
              </Button>
              <Button
                onClick={handelUpdateProfOpen}
                fullWidth
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </form>
          </div>
        </Container>
      </CardContent>
    </Card>
  );
}
