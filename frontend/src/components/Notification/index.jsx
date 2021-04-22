import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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

export default function Notification({
  variant,
  duration,
  show,
  message,
  vertical,
  horizontal,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(show);

  if (!variant) {
    variant = "success";
  }
  if (!duration) {
    duration = 4000;
  }
  if (!message) {
    message = "success message";
  }
  if (!vertical) {
    vertical = "bottom";
  }
  if (!horizontal) {
    horizontal = "right";
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={variant}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
