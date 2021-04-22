import React from "react";
import { Typography, makeStyles, Link } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: props => (props.height ? props.height : "36vh"),
  },
  footer: {
    backgroundColor: theme.palette.grey[500],
    textAlign: "center",
    color: pink[500],
    marginTop: "auto",
    padding: "2rem 0 2rem 0",
  },
}));

export default function Footer({ height }) {
  const classes = useStyles({ height });

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Typography variant="body1" color="inherit">
          {"Copyright © "}
          <Link
            color="inherit"
            href="/"
            style={{
              color: "#010101",
            }}
          >
            DiscussIn
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
    </div>
  );
}
