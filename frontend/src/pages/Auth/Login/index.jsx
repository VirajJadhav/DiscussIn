import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { login } from "../../../redux/AuthRedux/action";
import { FormBackground, NavBar } from "../../../components";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  makeStyles,
  Container,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";

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

function Login(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    event.persist();

    const data = {
      userName,
      password,
    };

    dispatch(login(data));
  };

  // console.log(props.authReducer);

  return (
    <div>
      <NavBar />
      <FormBackground>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <form onSubmit={onSubmit} className={classes.form}>
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
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={event => setPassword(event.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="discussin-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container direction="row" justify="center">
                <Grid item>
                  <Link
                    to="/signup"
                    className={classes.Link}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {"Don't have an account ? Sign Up"}
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

export default connect(mapStateToProps, {})(Login);
