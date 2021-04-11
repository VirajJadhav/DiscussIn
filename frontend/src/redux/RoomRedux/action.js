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
      message: error.response.data.result,
    });
  }
};
