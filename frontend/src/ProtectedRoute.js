import React, { useState, useEffect } from "react";
import { Loading } from "./components";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [credentialsValid, setCredentialsValid] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const verifyToken = () => {
      const backendURL = global.config.backendURL;
      let token = localStorage.getItem("tokendiscussin");
      axios
        .post(`${backendURL}/auth/verify`, {
          headers: { tokendiscussin: token },
        })
        .then(response => {
          setCredentialsValid(response.data.result);
          setValidated(true);
        })
        .catch(error => {
          setCredentialsValid(false);
          setValidated(true);
        });
    };
    verifyToken();
  });
  if (credentialsValid && validated) {
    return (
      <Route {...rest} render={props => <Component {...rest} {...props} />} />
    );
  } else if (!credentialsValid && validated) {
    localStorage.clear();
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <Loading
          isloading={true}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        />
      </div>
    );
  }
};

export default ProtectedRoute;
