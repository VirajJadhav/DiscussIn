import { combineReducers } from "redux";

import { authReducer } from "./AuthRedux";
import { roomReducer } from "./RoomRedux";
import { userReducer } from "./UserRedux";

export const rootReducer = combineReducers({
  authReducer,
  roomReducer,
  userReducer,
});
