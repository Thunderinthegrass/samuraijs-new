import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../api/api";

const initialState = {
  userId: null,
  login: null,
  email: null,
  // isAuth: 1,
  isAuth: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.login = action.payload.login;
        state.email = action.payload.email;
        state.isAuth = action.payload.isAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.login = action.payload.login;
        state.email = action.payload.email;
        state.isAuth = action.payload.isAuth;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.login = action.payload.login;
        state.email = action.payload.email;
        state.isAuth = action.payload.isAuth;
      })
  },
});

export const fetchUserData = createAsyncThunk("auth/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const response = await authAPI.getUserData();
    console.log("сработал fetchUserData")
    if (response.data.resultCode === 0) {
      const data = response.data;
      return {
        userId: data.data.id,
        login: data.data.login,
        email: data.data.id,
        isAuth: true,
      }
    } else {
        return rejectWithValue(response.data.messages[0] || 'Authentication failed');
      }
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.login(email, password, rememberMe);
      
      if (response.data.resultCode === 0) {
        console.log("данные из loginThunkCreator authSlice: ", response.data);
        // После успешного логина получаем данные пользователя
        const userDataResponse = await dispatch(fetchUserData());
        console.log("userDataResponse: - ", userDataResponse)
        if (fetchUserData.fulfilled.match(userDataResponse)) {
          return userDataResponse.payload;
        } else {
          return rejectWithValue('Failed to get user data after login');
        }
      } else {
        return rejectWithValue(response.data.messages[0] || 'Login failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
          return {
            userId: null,
            login: null,
            email: null,
            isAuth: false
          }
        }
  }
)

// вариант fetchUserData с then:
// export const fetchUserData = createAsyncThunk(
//   "auth/userDataThunkCreatorSlice",
//   () => {
//     return authAPI.getUserData().then((response) => {
//       if (response.data.resultCode === 0) {
//         const data = response.data;
//         return {
//           userId: data.data.id,
//           login: data.data.login,
//           email: data.data.id,
//           isAuth: true,
//         };
//       }
//     });
//   }
// );

//вариант login с then:
// export const login = createAsyncThunk(
//   "auth/login",
//   (email, password, rememberMe) => {
//     authAPI.login(email, password, rememberMe).then((response) => {
//       console.log("данные из loginThunkCreator authSlice: ", response.data);
//       if (response.data.resultCode === 0) {
//             dispatch(fetchUserData());
//           }
//     });
//   }
// );

export const authReducer = authSlice.reducer;
