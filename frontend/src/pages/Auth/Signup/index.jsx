import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { register } from "../../../redux/AuthRedux/action";
import { NavBar, FormBackground } from "../../../components";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  makeStyles,
  Container,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

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
    backgroundColor: theme.palette.iceCold.main,
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

function Signup(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [userName, setuserName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confPassword, setconfPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    event.persist();
    if (password !== confPassword) {
      return;
    }

    const data = {
      userName,
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(register(data));
  };

  // console.log(props.authReducer);

  return (
    <div>
      <NavBar />
      <FormBackground>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonAddIcon fontSize="large" />
            </Avatar>
            <form onSubmit={onSubmit} className={classes.form}>
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
                type="password"
                autoComplete="discussin-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={confPassword}
                onChange={event => setconfPassword(event.target.value)}
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
                    {"Already have an account ? Login"}
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

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(Signup);
