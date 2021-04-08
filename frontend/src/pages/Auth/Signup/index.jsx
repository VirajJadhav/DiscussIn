import React, { useState } from "react";
import { NavBar } from "../../../components";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  makeStyles,
  Typography,
  Container,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
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
  Link: {
    color: theme.palette.darkSlateBlue.main,
  },
}));

export default function Signup() {
  const classes = useStyles();

  const [userName, setuserName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    event.persist();

    console.log(userName, firstName, lastName, email, password);
  };

  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  onChange={event => setfirstName(event.target.value)}
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="discussin-firstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={lastName}
                  onChange={event => setlastName(event.target.value)}
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
              onChange={event => setemail(event.target.value)}
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
              onChange={event => setuserName(event.target.value)}
              id="userName"
              label="Username"
              name="userName"
              autoComplete="discussin-userName"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={event => setpassword(event.target.value)}
              id="password"
              label="Password"
              name="password"
              autoComplete="discussin-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container direction="row" justify="center">
              <Grid item>
                <Link
                  to="/Login"
                  className={classes.Link}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
