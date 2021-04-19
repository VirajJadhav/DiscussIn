import React from "react";
import { makeStyles, Box, Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    height: "auto",
    marginTop: "3rem",
    marginBottom: "2rem",
    padding: "0.2rem 0.1rem 1rem 0.1rem",
    backgroundColor: theme.palette.silverGrey.main,
  },
}));

export default function FormBackground({ children }) {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Box boxShadow={3} className={classes.root}>
        {children}
      </Box>
    </Container>
  );
}
