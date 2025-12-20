import {createSlice, createAsyncThunk, nanoid, type PayloadAction} from "@reduxjs/toolkit";
import { usersAPI } from "../api/api.js";

export interface Post {
  id: string;
  message: string;
  likes: number;
}

export interface Contacts {
  facebook: string | null;
  github: string | null;
  instagram: string | null;
  mainLink: string | null;
  twitter: string | null;
  vk: string | null;
  website: string | null;
  youtube: string | null;
}

export interface UserProfile {
  id: number | null;
  fullName: string | null;
  aboutMe: string | null
  contacts: Contacts;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  userId: number;
  photos: {
    small: string | null;
    large: string | null;
  };
}

interface ProfileState {
  posts: Post[];
  userData: UserProfile | null;
  status: string;
}

const initialState: ProfileState = {
  posts: [
        { id: "1", message: "Пост", likes: 15 },
        { id: "2", message: "Пост", likes: 17 },
        { id: "3", message: "Пост", likes: 12 },
        { id: "4", message: "Пост", likes: 20 },
      ],
      userData: null,//можно в качестве начального значения сделать null, тогда в эту переменную будет приходить объект, и можно будет его не копировать, а можно и пустой объект
      status: 'Привет',
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
      },
      prepare: (message: string) => ({
        payload: {
          id: nanoid(),
          message,
          likes: 5700,
        } as Post
      }),
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getStatus.fulfilled, (state, action) => {
      state.status = action.payload;
    })
    .addCase(getStatus.pending, (state) => {
      state.status = "Загрузка статуса...";
    })
    .addCase(getStatus.rejected, (state) => {
      state.status = "Ошибка";
    })
    .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = action.payload;
    }).addCase(updateStatus.pending, (state) => {
        state.status = "Статус обновляется";
    }).addCase(updateStatus.rejected, (state) => {
        state.status = "Статус не обновился";
    })
    .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
    })
  }
})

export const getUserData = createAsyncThunk<
  UserProfile,
  number | undefined,
  { rejectValue: string }
>("profile/getUserData", async (userId = 32562, { rejectWithValue }) => {
  try {
    const response = await usersAPI.getUserProfile(userId);
    return response.data;
  } catch (error) {
    return rejectWithValue("Не удалось загрузить профиль");
  }
})

export const getStatus = createAsyncThunk<
  string,
  number | undefined,
  { rejectValue: string }
>("profile/getStatus", async (userId = 32562, { rejectWithValue }) => {
  try {
    const response = await usersAPI.getStatus(userId);
    return response.data
  } catch (error) {
    return rejectWithValue("Статус не подгрузился почему-то");
  }
})

export const updateStatus = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("profile/setStatus", async (status, { rejectWithValue }) => {
  try {
    const response = await usersAPI.updateStatus(status);
    console.log("обновленный статус:", response.data);
    return status;
  } catch (error) {
    return rejectWithValue("Статус не обновился");
  }
})

export const profileReducer = profileSlice.reducer;
export const { addPost } = profileSlice.actions;