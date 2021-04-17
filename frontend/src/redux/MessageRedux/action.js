import { MESSAGE_REQUEST, MESSAGE_SUCCESS, MESSAGE_FAILURE } from "./types";
import axios from "axios";

const backendURL = global.config.backendURL;

export const saveMessageChat = messageList => async dispatch => {
  dispatch({
    type: MESSAGE_REQUEST,
  });
  try {
    const response = await axios.post(`${backendURL}/message`, { messageList });
    dispatch({
      type: MESSAGE_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};

export const getSavedMessages = roomID => async dispatch => {
  dispatch({
    type: MESSAGE_REQUEST,
  });
  try {
    const response = await axios.post(`${backendURL}/message/room/${roomID}`);
    dispatch({
      type: MESSAGE_SUCCESS,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_FAILURE,
      message: error.response ? error.response.data.result : error.message,
    });
  }
};
