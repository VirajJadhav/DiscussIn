import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification() {
  const classes = useStyles();

  const noti = useSelector(state => state.notificationReducer);

  const dispatch = useDispatch();

  const { variant, duration, show, message, vertical, horizontal } = noti;

  const ver = vertical ? vertical : "bottom";
  const hor = horizontal ? horizontal : "right";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: "NOTI_CLEAR",
    });
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={show}
        autoHideDuration={duration ? duration : 3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: ver, horizontal: hor }}
      >
        {show ? (
          <Alert onClose={handleClose} severity={variant}>
            {message ? message : "success message"}
          </Alert>
        ) : null}
      </Snackbar>
    </div>
  );
}
