import React from "react";
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
  userName,
  firstName,
  lastName,
  email,
  password,
  confPassword,
  loading,
  handleChange,
  onSubmit,
}) {
  const classes = useStyles();

  return (
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
                onChange={handleChange}
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
                onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            disabled={loading}
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
  );
}

export default Form;
