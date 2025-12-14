import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingProgress: [],
  fake: 0
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

  }
})

export const getUsersData = createAsyncThunk("users/getUsers", async (currentPage = 1, pageSize) => {
  const response = await usersAPI.getUsers(currentPage, pageSize);
  console.log(response)
})

export const usersReducer = usersSlice.reducer;