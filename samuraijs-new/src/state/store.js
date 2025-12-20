import { configureStore } from "@reduxjs/toolkit";
import { dialogsReducer } from "./dialogsSlice.js";
import { authReducer } from "./authSlice";
import { profileReducer } from "./profileSlice.js";
import {usersReducer} from "./usersSlice.js";

export const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
  }
})