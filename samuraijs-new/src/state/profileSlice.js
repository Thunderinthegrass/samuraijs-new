import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

const initialState = {
  posts: [
        { id: 1, message: "Пост", likes: 15 },
        { id: 2, message: "Пост", likes: 17 },
        { id: 3, message: "Пост", likes: 12 },
        { id: 4, message: "Пост", likes: 20 },
      ],
      userData: null,//можно в качестве начального значения сделать null, тогда в эту переменную будет приходить объект, и можно будет его не копировать, а можно и пустой объект
      status: 'Привет',
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const postId = state.posts.length + 1;

      const newPost = {
        id: postId,
        message: action.payload,
        likes: 10
      }
      return {
        ...state,
        posts: [...state.posts, newPost],//новый массив
        newPostText: ""//сброс текста
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getStatus.fulfilled, (state, action) => {
      state.status = action.payload.status;
    })
    .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
    })
    .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload.data;
    })
  }
})

export const getUserData = createAsyncThunk("profile/getUserData", async (userId = 32562) => {
  const response = await usersAPI.getUserProfile(userId);
  console.log("userData из profileSlice при загрузке",response)
  const data = response.data;
  return{ data }
})

export const getStatus = createAsyncThunk("profile/getStatus", async (userId = 32562) => {
  const response = await usersAPI.getStatus(userId);
  console.log("статус: ",response)
  return {
    status: response.data,
  }
})

export const updateStatus = createAsyncThunk("profile/setStatus", async (status) => {
  const response = await usersAPI.updateStatus(status);
  console.log(response);
  return {status}
})

export const profileReducer = profileSlice.reducer;
export const { addPost } = profileSlice.actions;