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
  Button,
  Hidden,
  Tooltip,
} from "@material-ui/core";
import {
  Person,
  Info as InfoIcon,
  Send as SendIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
} from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";

const drawerWidth = 260;

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
  saveChat: {
    display: "none",
    marginRight: "1rem",
    [theme.breakpoints.down("sm")]: {
      display: "initial",
      cursor: "pointer",
    },
  },
}));

export default function RoomLayout({
  children,
  users,
  title,
  status,
  createdAt,
  message,
  handleInfoModal,
  handleSendMessage,
  handleChange,
  saveChat,
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
                <HomeIcon
                  style={{
                    fontSize: "1.8rem",
                  }}
                />
              </div>
            </Grid>
            <Grid item>
              <Typography variant="h6" noWrap>
                {createdAt}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                {status === "private" ? (
                  <Grid item>
                    <Hidden smDown>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={saveChat}
                        variant="contained"
                        endIcon={<SaveIcon />}
                        style={{
                          marginRight: "1rem",
                        }}
                      >
                        Save Chat
                      </Button>
                    </Hidden>
                    <div onClick={saveChat} className={classes.saveChat}>
                      <Tooltip title="Save Chat">
                        <SaveIcon
                          style={{
                            fontSize: "1.8rem",
                          }}
                        />
                      </Tooltip>
                    </div>
                  </Grid>
                ) : null}
                <Grid item>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleInfoModal}
                  >
                    <InfoIcon
                      style={{
                        fontSize: "1.8rem",
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
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
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Typography
          style={{
            textAlign: "center",
            margin: "1rem 0 1rem 0",
          }}
          variant="h6"
        >
          {`Active Users ( ${users.length} )`}
        </Typography>
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
          {`Active Users ( ${users.length} )`}
        </Typography>
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
              onKeyDown={event => handleSendMessage(event)}
              value={message}
              onChange={handleChange}
              name="message"
              id="message"
              label="Message"
              placeholder="Type a message here ..."
              variant="outlined"
              fullWidth
            />
            <IconButton onClick={event => handleSendMessage(event)} edge="end">
              <SendIcon className={classes.sendButton} />
            </IconButton>
          </Toolbar>
        </div>
      </main>
    </div>
  );
}
