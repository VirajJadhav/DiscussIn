import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "relative",
    bottom: "0",
    marginTop: "2rem",
    backgroundColor: theme.palette.darkGrey.main,
  },
  copyright: {
    margin: "auto",
  },
}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <Typography className={classes.copyright}>© 2021 DiscussIn</Typography>
      </BottomNavigation>
    </div>
  );
}
