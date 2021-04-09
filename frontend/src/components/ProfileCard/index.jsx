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
    event.persist();

    console.log(userName, password);
  };

  const resetPassSubmit = event => {
    event.preventDefault();
    event.persist();

    console.log(confPassword);
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
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <form onSubmit={onSubmit} className={classes.form} noValidate>
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={userName}
                id="userName"
                label="Username"
                name="userName"
                autoComplete="discussin-userName"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Update Profile
              </Button>
            </form>
            <Grid container direction="row" justify="center">
              <Grid item>
                <Link
                  onClick={handleResetPassform}
                  className={classes.Link}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {"Reset Password"}
                </Link>
              </Grid>
            </Grid>
            <form
              onSubmit={resetPassSubmit}
              className={classes.form}
              noValidate
              style={{ display: resetPassOpen ? "block" : "none" }}
            >
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Reset Password
              </Button>
            </form>
          </div>
        </Container>
      </CardContent>
    </Card>
  );
}
