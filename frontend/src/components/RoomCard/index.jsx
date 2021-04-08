import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "22rem",
    height: "auto",
    borderRadius: "1rem",
    margin: "0.6rem",
  },
  cardBottom: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
<<<<<<< HEAD
    height: "2rem",
    paddingTop: 0,
  },
  auther: {
    width: "20rem",
    marginLeft: 2,
  },
  date: {
    marginRight: 0,
    paddingRight: 0,
    width: "4rem",
  },
  title: {
    height: "2rem",
  },
  subtitle: {
    height: "1.5rem",
=======
    padding: "1rem 0.5rem 1rem 0.5rem",
>>>>>>> 962a902d8c2610be39735312255db56c8895aad4
  },
  description: {
    height: "5rem",
    overflow: "hidden",
  },
  ellipse: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "11rem",
  },
}));

export default function RoomCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" noWrap>
          Topic Title
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="p" noWrap>
          Topic Subtitle
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.description}
        >
          Lizards are a widespread group of squamate reptiles, with overA
          scientist is a person who conducts scientific research to advance
          knowledge in an area of interest. In classical antiquity, there was no
          real ancient analog Lizards are a widespread group of squamate
          reptiles, with overA scientist is a person who conducts scientific
          research to advance knowledge in an area of interest. In classical
          antiquity, there was no real ancient analog
        </Typography>
      </CardContent>
      <CardActions className={classes.cardBottom}>
<<<<<<< HEAD
        <Grid container spacing={1} justify="center">
          <Grid item xs={7} container justify="flex-end">
            <Typography
              variant="body2"
              color={theme.palette.secondary.main}
              className={classes.auther}
              noWrap
              style={{ margin: "auto" }}
            >
              Nagesh Nagshakti shjgvhb ehgfhg
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            container
            justify="flex-end"
            className={classes.date}
          >
            <Typography
              variant="caption"
              style={{ margin: "auto", marginRight: 0 }}
              noWrap
            >
              28 Mar 2021
=======
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.ellipse} variant="body2" noWrap>
              Nagesh Nagshakti
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" noWrap>
              27 March 2021
>>>>>>> 962a902d8c2610be39735312255db56c8895aad4
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
