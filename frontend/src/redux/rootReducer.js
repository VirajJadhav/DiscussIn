import { combineReducers } from "redux";

import { authReducer } from "./AuthRedux";
import { roomReducer } from "./RoomRedux";
import { userReducer } from "./UserRedux";
import { messageReducer } from "./MessageRedux";

export const rootReducer = combineReducers({
  authReducer,
  roomReducer,
  userReducer,
  messageReducer,
});
