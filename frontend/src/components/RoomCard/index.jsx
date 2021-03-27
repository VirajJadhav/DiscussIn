import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles(theme => ({
  root: {
    width: "22rem",
    height: "14rem",
    borderRadius: "1rem",
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
    width: 200,
    marginLeft: 15,
  },
  date: {
    marginRight: 0,
  },
}));

export default function RoomCard() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Card className={classes.root}>
        <CardActionArea className={classes.cardUpper}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Topic Title
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="p">
              Topic Subtitle
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
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
              >
                Auther: Nagesh Nagshakti
              </Typography>
            </Grid>
            <Grid item xs={5} wrap="nowrap" spacing={2}>
              <Typography
                variant="caption"
                justify="flex-end"
                className={classes.date}
              >
                27 Mar 2021 12.00 PM
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Paper>
  );
}
