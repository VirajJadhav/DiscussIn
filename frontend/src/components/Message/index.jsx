import React from "react";
import { Divider, makeStyles, Typography } from "@material-ui/core";

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
    float: props => checkProps(props),
    clear: props => checkProps(props),
    maxWidth: "48vw",
  },
  message: {
    padding: theme.spacing(1.5),
    borderRadius: props =>
      props.position === "left" ? "0 25px 22px 22px" : "22px 25px 0 22px",
    border: "1px solid black",
    backgroundColor: "white",
  },
  messageDate: {
    textAlign: props => (props.position === "right" ? "left" : "right"),
    margin: props =>
      props.position === "right" ? "0.5rem 0.5rem 0 0" : "0.5rem 0 0 0.5rem",
    fontSize: "0.9rem",
  },
  sender: {
    textAlign: props => checkProps(props),
    fontSize: "0.8rem",
  },
}));

export default function Message({ position, message, messageDate, sender }) {
  const classes = useStyles({ position });

  return (
    <div className={classes.root}>
      <div className={classes.messageContainer}>
        <div className={classes.message}>
          {message}
          <Divider
            style={{
              margin: "0.5rem 0 0.5rem 0",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          />
          <div className={classes.sender}>{sender ? sender : "Guest"}</div>
        </div>

        <Typography variant="subtitle1" className={classes.messageDate}>
          {messageDate}
        </Typography>
      </div>
    </div>
  );
}
