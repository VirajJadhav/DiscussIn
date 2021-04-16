import React from "react";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  loading: {
    color: props => (props.color ? props.color : "black"),
  },
}));

export default function Loading({ isloading, color }) {
  const classes = useStyles({ color });

  if (isloading) {
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.loading} />
      </div>
    );
  } else {
    return null;
  }
}
