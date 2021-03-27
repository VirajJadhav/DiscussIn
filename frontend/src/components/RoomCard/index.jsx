import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Paper,
} from "@material-ui/core";
import theme from "../../theme";

const useStyles = makeStyles(theme => ({
  root: {
    width: 350,
    height: 200,
    borderRadius: 10,
  },
  cardUpper: {
    backgroundColor: "White",
  },
  cardBottom: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
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
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardBottom}>
          <Typography variant="body2" color={theme.palette.secondary.main}>
            Auther : Nagesh
          </Typography>
          <Typography variant="caption" align="right">
            27 Mar 2021 12.00 PM
          </Typography>
        </CardActions>
      </Card>
    </Paper>
  );
}
