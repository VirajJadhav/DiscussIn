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
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Person,
  Info as InfoIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Share as ShareIcon,
  Chat as ChatIcon,
  Clear as ClearIcon,
  Group as GroupIcon,
  Assignment as DocumentIcon,
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
    backgroundColor: theme.palette.greyBlueShade.light,
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
  roomTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "30rem",
    height: "1.8rem",
    [theme.breakpoints.down("sm")]: {
      width: "8rem",
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
  clearChat,
  userIsValid,
  handleCopyModal,
  handleEditor,
}) {
  const classes = useStyles();

  const history = useHistory();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [anchorChatEl, setAnchorChatEl] = React.useState(null);

  const goBack = () => {
    history.push("/");
  };

  const handleMobileDrawer = () => {
    setMobileDrawerOpen(prevState => !prevState);
  };

  const handleChatMenu = event => {
    setAnchorChatEl(event.currentTarget);
  };

  const handleChatMenuClose = () => {
    setAnchorChatEl(null);
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
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" className={classes.roomTitle}>
                  {title}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  {createdAt}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <div
                    onClick={handleCopyModal}
                    style={{
                      marginRight: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    <Tooltip title="Share">
                      <ShareIcon
                        style={{
                          fontSize: "1.7rem",
                        }}
                      />
                    </Tooltip>
                  </div>
                </Grid>
                {status === "private" && userIsValid ? (
                  <Grid item>
                    <div
                      aria-controls="profile-menu"
                      aria-haspopup="true"
                      onClick={handleChatMenu}
                      style={{
                        cursor: "pointer",
                        marginRight: "1rem",
                      }}
                    >
                      <Tooltip title="Chat Options">
                        <ChatIcon
                          style={{
                            fontSize: "1.7rem",
                          }}
                        />
                      </Tooltip>
                    </div>
                    <Menu
                      id="profile-menu"
                      anchorEl={anchorChatEl}
                      keepMounted
                      open={Boolean(anchorChatEl)}
                      onClose={handleChatMenuClose}
                    >
                      <div onClick={saveChat}>
                        <MenuItem>
                          Save Chat{" "}
                          <SaveIcon
                            style={{
                              marginLeft: "0.5rem",
                            }}
                          />
                        </MenuItem>
                      </div>
                      <div onClick={clearChat}>
                        <MenuItem>
                          Clear Chat{" "}
                          <ClearIcon
                            style={{
                              marginLeft: "0.5rem",
                            }}
                          />
                        </MenuItem>
                      </div>
                    </Menu>
                  </Grid>
                ) : null}
                <Grid item>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleInfoModal}
                  >
                    <Tooltip title="Info">
                      <InfoIcon
                        style={{
                          fontSize: "1.7rem",
                        }}
                      />
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div
            className={classes.mobileDrawerIcon}
            onClick={handleMobileDrawer}
          >
            <GroupIcon
              style={{
                fontSize: "1.7rem",
              }}
            />
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
            <div
              onClick={handleEditor}
              style={{
                marginLeft: "-0.5rem",
                marginRight: "1rem",
                cursor: "pointer",
              }}
            >
              <Tooltip title="Notepad">
                <DocumentIcon
                  style={{
                    color: "orangered",
                  }}
                />
              </Tooltip>
            </div>
            <TextField
              style={{
                backgroundColor: "white",
              }}
              onKeyDown={event => handleSendMessage(event)}
              value={message}
              onChange={handleChange}
              name="message"
              id="message"
              label="Message"
              placeholder="Type a message here ..."
              variant="filled"
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
