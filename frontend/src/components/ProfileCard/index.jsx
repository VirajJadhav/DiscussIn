import React, { useState } from "react";
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
    width: "auto",
    height: "auto",
    borderRadius: "1rem",
    margin: "0.5rem",
    boxShadow: `1px 1px 4px 5px ${theme.palette.heavyPurple.light}`,
    backgroundColor: "rgba(129, 162, 162, 0.6)",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    width: "4rem",
    height: "4rem",
    padding: "0.5rem",
    backgroundColor: theme.palette.heavyPurple.light,
    color: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
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
  resetPass: {
    color: theme.palette.error.main,
    textAlign: "center",
    margin: "1rem 0 0.5rem 0",
    cursor: "pointer",
  },
}));

export default function ProfileCard({
  userName,
  firstName,
  lastName,
  email,
  updateProfile,
}) {
  const classes = useStyles();
  const [newFirstName, setnewFirstName] = useState(firstName);
  const [newLastName, setnewLastName] = useState(lastName);
  const [newEmail, setnewEmail] = useState(email);

  const [newPassword, setnewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    event.persist();
    if (resetPassOpen) {
      if (newPassword !== confPassword) {
        alert("Please check your passwords !");
        return;
      }
    }

    const data = {
      userName,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
    };

    if (newPassword !== "") {
      data["password"] = newPassword;
    }

    updateProfile(data);

    setnewPassword("");
    setConfPassword("");

    handelUpdateProfOpen();
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
            <Avatar className={classes.avatar} />
            <Grid item xs={12}>
              <Typography className={classes.userName} variant="h6" noWrap>
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
                <Grid item xs={12}>
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
                Edit Profile
              </Button>
            </div>
            <form
              onSubmit={onSubmit}
              className={classes.form}
              style={{ display: updateProfOpen ? "block" : "none" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={newFirstName}
                    onChange={event => setnewFirstName(event.target.value)}
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
                    value={newLastName}
                    onChange={event => setnewLastName(event.target.value)}
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
                value={newEmail}
                onChange={event => setnewEmail(event.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="discussin-email"
              />
              <div className={classes.resetPass}>
                <Typography onClick={handleResetPassform}>
                  {resetPassOpen ? "Cancel Reset Password" : "Reset Password"}
                </Typography>
              </div>
              <div style={{ display: resetPassOpen ? "block" : "none" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
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
