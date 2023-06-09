import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import userReducer from "./userReducer";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
  devTools: true,
});
