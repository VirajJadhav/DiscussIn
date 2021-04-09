import React, { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";
import {
  Person,
  ArrowBack as BackButton,
  Info as InfoIcon,
  Send as SendIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileDrawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: "4rem",
  },
  textSection: {
    position: "fixed",
    top: "auto",
    left: drawerWidth,
    right: 0,
    bottom: 0,
    padding: "0.7rem 0 0.7rem 0",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      left: 0,
    },
  },
  sendButton: {
    // color: theme.palette.darkSlateBlue.main,
    color: "#006bb3",
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

export default function RoomLayout({
  children,
  users,
  title,
  createdAt,
  handleInfoModal,
}) {
  const classes = useStyles();

  const history = useHistory();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const goBack = () => {
    history.replace("/");
  };

  const handleMobileDrawer = () => {
    setMobileDrawerOpen(prevState => !prevState);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <div
                style={{
                  marginRight: "1rem",
                  cursor: "pointer",
                }}
                onClick={goBack}
              >
                <BackButton />
              </div>
            </Grid>
            <Grid item>
              <Typography variant="h6" noWrap>
                {createdAt}
              </Typography>
            </Grid>
            <Grid item>
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={handleInfoModal}
              >
                <InfoIcon fontSize="large" />
              </div>
            </Grid>
          </Grid>
          <div
            className={classes.mobileDrawerIcon}
            onClick={handleMobileDrawer}
          >
            <MenuIcon />
          </div>
        </Toolbar>
      </AppBar>
      {/* Desktop Drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        open={mobileDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {users.map((text, index) => (
              <div key={`room-users-${text}-${index}`}>
                <ListItem
                  style={{
                    margin: "0.7rem 0 0.7rem 0",
                  }}
                  button
                >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
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
        <div className={classes.drawerContainer}>
          <List>
            {users.map((text, index) => (
              <div key={`room-users-${text}-${index}`}>
                <ListItem
                  style={{
                    margin: "0.7rem 0 0.7rem 0",
                  }}
                  button
                >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
        <div className={classes.textSection}>
          <Toolbar>
            <TextField
              id="message-text"
              label="Message"
              placeholder="Type a message here ..."
              variant="outlined"
              fullWidth
            />
            <IconButton edge="end">
              <SendIcon className={classes.sendButton} />
            </IconButton>
          </Toolbar>
        </div>
      </main>
    </div>
  );
}
