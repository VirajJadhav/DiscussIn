import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import logo from "../../logo.png";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "38%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <img
            src={logo}
            alt="DiscussIn-logo"
            height="120px"
            style={{
              marginBottom: "2rem",
            }}
          />
          <Typography
            variant="h4"
            style={{
              marginBottom: "1rem",
            }}
          >
            Oops ! Page not found (404)
          </Typography>
          <Typography variant="h6">
            Lets go to
            <Link
              style={{
                margin: "0.8rem",
              }}
              to="/"
            >
              <Button variant="contained" color="primary">
                Dashboard
              </Button>
            </Link>
            Instead !
          </Typography>
        </div>
      </div>
    );
  }
}

export default NotFound;
