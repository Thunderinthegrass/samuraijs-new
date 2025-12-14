import { configureStore } from "@reduxjs/toolkit";
import { dialogsReducer } from "./dialogsSlice.js";
import { authReducer } from "./authSlice";
import { profileReducer } from "./profileSlice";

export const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    auth: authReducer,
    profile: profileReducer
  }
})