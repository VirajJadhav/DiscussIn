import React, { useState } from "react";
import { ProfileCard } from "../../../components";
import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const drawerWidth = "32rem";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    zIndex: 1,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  mobileDrawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: "4rem",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileDrawerIcon: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      cursor: "pointer",
      display: "initial",
      marginLeft: "1rem",
    },
  },
}));

export default function ProfileLayout({
  children,
  users,
  title,
  createdAt,
  message,
  handleInfoModal,
  handleSendMessage,
  handleChange,
}) {
  const classes = useStyles();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleMobileDrawer = () => {
    setMobileDrawerOpen(prevState => !prevState);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div
            style={{
              margin: "6rem 1.2rem 6rem 1.2rem",
            }}
          >
            <ProfileCard />
          </div>
        </div>
      </Drawer>
      {/* Mobile drawer */}
      <Drawer
        className={classes.mobileDrawer}
        onClose={handleMobileDrawer}
        anchor="right"
        open={mobileDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar>
          <div
            style={{
              cursor: "pointer",
              margin: "0.5rem 0 0.5rem 0",
            }}
            onClick={handleMobileDrawer}
          >
            <CloseIcon />
          </div>
        </Toolbar>
        <Divider />
        <Typography
          style={{
            textAlign: "center",
            margin: "1rem 0 1rem 0",
          }}
          variant="h6"
        >
          {`Active Users`}
        </Typography>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <Typography variant="h4">{"Private Rooms"}</Typography>
        <Divider />
        <Toolbar />
        {children}
      </main>
    </div>
  );
}
