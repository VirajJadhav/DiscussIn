import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

function checkProps(props) {
  if (props.position === "right") {
    return "right";
  } else {
    return "left";
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: "1.2rem",
    wordWrap: "break-word",
    float: props => checkProps(props),
    clear: props => checkProps(props),
  },
  messageContainer: {
    maxWidth: "55%",
    float: props => checkProps(props),
    clear: props => checkProps(props),
  },
  message: {
    padding: theme.spacing(1.5),
    borderRadius: props =>
      props.position === "left" ? "0 25px 22px 22px" : "22px 25px 0 22px",
    border: "1px solid black",
    backgroundColor: "white",
  },
  messageDate: {
    textAlign: props => checkProps(props),
    margin: props =>
      props.position === "right" ? "0.5rem 0.5rem 0 0" : "0.5rem 0 0 0.5rem",
    fontSize: "0.9rem",
  },
}));

export default function Message({ position, message, messageDate }) {
  const classes = useStyles({ position });

  return (
    <div className={classes.root}>
      <div className={classes.messageContainer}>
        <Typography variant="body1" className={classes.message}>
          {message}
        </Typography>
        <Typography variant="subtitle1" className={classes.messageDate}>
          {messageDate}
        </Typography>
      </div>
    </div>
  );
}
