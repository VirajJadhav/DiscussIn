import { combineReducers } from "redux";

import { authReducer } from "./AuthRedux";
import { roomReducer } from "./RoomRedux";

export const rootReducer = combineReducers({
  authReducer,
  roomReducer,
});
