import { ROOM_REQUEST, ROOM_FAILURE, ROOM_SUCCESS } from "./types";
import axios from "axios";

const backendURL = global.config.backendURL;

export const addRoom = data => async dispatch => {
  dispatch({
    type: ROOM_REQUEST,
  });
  try {
    const response = await axios.post(`${backendURL}/room/add`, data);
    dispatch({
      type: ROOM_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const getRoom = roomID => async dispatch => {
  dispatch({
    type: ROOM_REQUEST,
  });
  try {
    const response = await axios.get(`${backendURL}/room/${roomID}`);
    dispatch({
      type: ROOM_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const getRoomByStatus = status => async dispatch => {
  dispatch({
    type: ROOM_REQUEST,
  });
  try {
    const response = await axios.get(`${backendURL}/room/status/${status}`);
    dispatch({
      type: ROOM_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const checkRoomUser = data => async dispatch => {
  dispatch({
    type: ROOM_REQUEST,
  });
  try {
    const response = await axios.get(
      `${backendURL}/room/${data.roomID}/${data.userName}`
    );
    dispatch({
      type: ROOM_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const getRoomUserNameStatus = data => async dispatch => {
  dispatch({
    type: ROOM_REQUEST,
  });
  try {
    const response = await axios.get(
      `${backendURL}/room/userName/status/${data.userName}/${data.status}`
    );
    dispatch({
      type: ROOM_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: ROOM_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};
