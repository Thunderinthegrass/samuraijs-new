import {createSlice, createAsyncThunk, nanoid} from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingProgress: [],
  fake: 0,
  pageSizes: [5, 10, 15, 20, 100, 101],
};

export const getUsersData = createAsyncThunk("users/getUsersData",
  async ({currentPage, pageSize}, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getUsers(currentPage, pageSize);
      console.log("response: ", response)
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  })

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    changePageSize: (state, action) => {
      state.pageSize = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersData.fulfilled, (state, action) => {
      state.users = action.payload.items;
      state.totalUsersCount = action.payload.totalCount;
    })
  }
})

export const usersReducer = usersSlice.reducer;
export const { changePage, changePageSize } = usersSlice.actions;