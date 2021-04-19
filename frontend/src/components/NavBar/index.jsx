import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  useScrollTrigger,
  Fab,
  Zoom,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  VpnKey,
  MeetingRoom,
  Add as AddIcon,
  TransitEnterexit as EnterIcon,
  Person,
  ExitToApp as LogoutIcon,
  AccountCircle,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { verifyUser } from "../../util";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10000,
  },
  appbar: {
    backgroundColor: theme.palette.greyBlueShade.main,
  },
  pink: {
    color: theme.palette.getContrastText(pink[300]),
    backgroundColor: pink[600],
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function NavBar(props) {
  const classes = useStyles();

  const [userName, setUserName] = useState("");

  const [loading, setLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authReducer = useSelector(state => state.authReducer);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [anchorProfileEl, setAnchorProfileEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = event => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const logout = () => {
    const token = localStorage.getItem("tokendiscussin");
    if (token) {
      localStorage.removeItem("tokendiscussin");
    }
    window.location.href = "/login";
  };

  useEffect(() => {
    async function verify() {
      const result = await verifyUser(authReducer);
      if (result.isLoggedIn) {
        setUserName(result.userName);
        setIsLoggedIn(true);
      }
      setLoading(false);
    }
    verify();
  }, []);

  return (
    <div>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Link
            style={{
              textDecoration: "none",
              flexGrow: 1,
              color: "white",
            }}
            to="/"
          >
            <Typography variant="h6">DiscussIn</Typography>
          </Link>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              variant="contained"
              endIcon={<MeetingRoom />}
              style={{
                marginRight: "1rem",
              }}
            >
              Rooms
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link
                to="/addRoom"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <MenuItem>
                  Add Room{" "}
                  <AddIcon
                    style={{
                      marginLeft: "0.5rem",
                    }}
                  />
                </MenuItem>
              </Link>
              <Link
                to="/joinRoom"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <MenuItem>
                  Join Room{" "}
                  <EnterIcon
                    style={{
                      marginLeft: "0.5rem",
                    }}
                  />
                </MenuItem>
              </Link>
            </Menu>
          </div>
          {loading ? null : isLoggedIn ? (
            <div>
              <div
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleProfile}
                style={{
                  cursor: "pointer",
                }}
              >
                <Tooltip title="Profile">
                  <Avatar className={classes.pink}>
                    <Person />
                  </Avatar>
                </Tooltip>
              </div>
              <Menu
                id="profile-menu"
                anchorEl={anchorProfileEl}
                keepMounted
                open={Boolean(anchorProfileEl)}
                onClose={handleProfileClose}
              >
                <Link
                  to={`/profile/${userName}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <MenuItem>
                    Profile{" "}
                    <AccountCircle
                      style={{
                        marginLeft: "0.5rem",
                      }}
                    />
                  </MenuItem>
                </Link>
                <div onClick={logout}>
                  <MenuItem>
                    Logout{" "}
                    <LogoutIcon
                      style={{
                        marginLeft: "0.5rem",
                      }}
                    />
                  </MenuItem>
                </div>
              </Menu>
            </div>
          ) : (
            <Link
              style={{
                textDecoration: "none",
              }}
              to="/login"
            >
              <Button variant="contained" endIcon={<VpnKey />}>
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab
          className={classes.pink}
          color="secondary"
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}
