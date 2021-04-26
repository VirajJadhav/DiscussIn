import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

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
  cardDelete: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    color: theme.palette.error.main,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function RoomCard({
  title,
  subTitle,
  description,
  author,
  date,
  status,
  link,
  deleteRoom,
}) {
  const classes = useStyles();

  const returnDateFormat = date => {
    const newDate = new Date(date);
    const result = newDate.toLocaleDateString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return result.split("-").join(" ") || result;
  };

  return (
    <div>
      <Card className={classes.root}>
        <Link
          style={{
            textDecoration: "none",
            cursor: "pointer",
            color: "inherit",
          }}
          to={link}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" noWrap>
              {title ? title : "-"}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="p" noWrap>
              {subTitle ? subTitle : "-"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.description}
            >
              {description ? description : "-"}
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
                  {returnDateFormat(date)}
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Link>
        {status === "private" ? (
          <CardActions onClick={deleteRoom} className={classes.cardDelete}>
            <DeleteIcon />
          </CardActions>
        ) : null}
      </Card>
    </div>
  );
}
