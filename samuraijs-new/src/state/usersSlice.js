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

export const follow = createAsyncThunk("users/follow",
  async ({userId}, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getFollow(userId);
      if (response.data.resultCode !== 0) {
        return rejectWithValue(response.data)
      }
      return userId;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  })

export const unFollow = createAsyncThunk("users/unFollow",
  async ({userId}, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getUnfollow(userId);
      if (response.data.resultCode !== 0) {
        return rejectWithValue(response.data)
      }
      return userId;
    } catch (error) {
      return rejectWithValue(error.message)
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
    builder
      .addCase(getUsersData.fulfilled, (state, action) => {
      state.users = action.payload.items;
      state.totalUsersCount = action.payload.totalCount;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.users = state.users.map(user =>
          user.id === action.payload
            ? { ...user, followed: true }
            : user
        );

        state.followingProgress = state.followingProgress.filter(
          id => id !== userId
        );
      })
      .addCase(unFollow.fulfilled, (state, action) => {
        state.users = state.users.map(user =>
          user.id === action.payload
            ? { ...user, followed: false }
            : user
        );
      })
  }
})

export const usersReducer = usersSlice.reducer;
export const { changePage, changePageSize } = usersSlice.actions;