import axios from "axios";

export const verifyUser = async authReducer => {
  const payload = authReducer.payload;
  const token = localStorage.getItem("tokendiscussin");
  if (typeof payload !== "string" && payload.userName !== undefined) {
    return {
      userName: payload.userName,
      isLoggedIn: true,
    };
  } else if (token) {
    try {
      const backendURL = global.config.backendURL;
      const response = await axios.post(`${backendURL}/auth/verify`, {
        headers: { tokendiscussin: token, userid: true },
      });
      if (!response.data.error) {
        return {
          userName: response.data.result.userName,
          isLoggedIn: true,
        };
      } else {
        return {
          userName: null,
          isLoggedIn: false,
        };
      }
    } catch (error) {
      return {
        userName: null,
        isLoggedIn: false,
      };
    }
  } else {
    return {
      userName: null,
      isLoggedIn: false,
    };
  }
};
