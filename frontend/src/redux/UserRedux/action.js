import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "./types";
import axios from "axios";

const backendURL = global.config.backendURL;

export const checkUser = userName => async dispatch => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const response = await axios.get(`${backendURL}/user/verify/${userName}`);
    dispatch({
      type: USER_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: USER_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const getUserData = userName => async dispatch => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const response = await axios.get(`${backendURL}/user/${userName}`);
    dispatch({
      type: USER_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: USER_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const updateUser = data => async dispatch => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const response = await axios.post(`${backendURL}/user/update`, data);
    dispatch({
      type: USER_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: USER_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const deleteUser = data => async dispatch => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const response = await axios.delete(
      `${backendURL}/user/delete/${data.userName}`
    );
    dispatch({
      type: USER_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: USER_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};
