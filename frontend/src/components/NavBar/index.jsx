import React from "react";
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
} from "@material-ui/core";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  VpnKey,
  MeetingRoom,
  Add as AddIcon,
  TransitEnterexit as EnterIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <MenuItem>
                Add Room{" "}
                <AddIcon
                  style={{
                    marginLeft: "0.5rem",
                  }}
                />
              </MenuItem>
              <MenuItem>
                Join Room{" "}
                <EnterIcon
                  style={{
                    marginLeft: "0.5rem",
                  }}
                />
              </MenuItem>
            </Menu>
          </div>
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
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab
          style={{
            boxShadow: "1px 1px 2px 3px #888888",
          }}
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
