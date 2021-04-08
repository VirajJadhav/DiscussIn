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
    padding: "1rem 0.5rem 1rem 0.5rem",
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

export default function RoomCard({
  title,
  subTitle,
  description,
  author,
  date,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" noWrap>
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="p" noWrap>
          {subTitle}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.description}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardBottom}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.ellipse} variant="body2" noWrap>
              {author}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" noWrap>
              {date}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
