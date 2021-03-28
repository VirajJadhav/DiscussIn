import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles(theme => ({
  root: {
    width: "22rem",
    height: "14rem",
    borderRadius: "1rem",
    margin: "0.6rem",
  },
  cardUpper: {
    backgroundColor: "White",
    height: "12rem",
  },
  cardBottom: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "2rem",
    paddingTop: 0,
  },
  auther: {
    width: "16rem",
    marginLeft: 2,
  },
  date: {
    marginRight: 0,
  },
  title: {
    height: "2rem",
  },
  subtitle: {
    height: "1.5rem",
  },
  description: {
    height: "8.5rem",
  },
}));

export default function RoomCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardUpper}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
            noWrap
          >
            Topic Title
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="p"
            className={classes.subtitle}
            noWrap
          >
            Topic Subtitle
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}
            flexWrap="wrap"
          >
            Lizards are a widespread group of squamate reptiles, with overA
            scientist is a person who conducts scientific research to advance
            knowledge in an area of interest. In classical antiquity, there was
            no real ancient analog
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardBottom}>
        <Grid container spacing={1}>
          <Grid item xs={7} wrap="nowrap" spacing={2}>
            <Typography
              variant="body2"
              color={theme.palette.secondary.main}
              className={classes.auther}
              noWrap
            >
              Auther: Nagesh Nagshakti
            </Typography>
          </Grid>
          <Grid item xs={5} wrap="nowrap" spacing={2}>
            <Typography
              variant="caption"
              justify="flex-end"
              className={classes.date}
              noWrap
            >
              27 Mar 2021 12.00 PM
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
