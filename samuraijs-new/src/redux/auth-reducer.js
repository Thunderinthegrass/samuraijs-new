import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const ERROR = 'ERROR';

const initialState = {
  userId: null,
  login: null,
  email: null,
  // isAuth: 1,
  isAuth: false,
  error: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      console.log(initialState.isAuth);
      return {
        ...state,
        ...action.data,
        // isAuth: true//из-за этого тоже были проблемы
      }
    case ERROR:
      return {
        ...state,
        ...action.error,
      }
    default: return state;
  }
}

export const userData = (userId, login, email, isAuth) => ({type: SET_USER_DATA, data: {userId, login, email, isAuth}});
export const error = (error) => ({type: ERROR, error: {error}});

// export const userDataThunkCreator = () => {
//   return (dispatch) => {
//     authAPI.getUserData().then(response => {
//       const data = response.data;
//       dispatch(userData(data.data.id, data.data.login, data.data.email, data.resultCode))//resultCode находится в объекте ответа, остальные данные находятся в объекте data, вложенном в объект ответа
//     });
//   }
// }

export const userDataThunkCreator = () => {
  return (dispatch) => {
    return authAPI.getUserData().then(response => {
      if (response.data.resultCode === 0) {
        const data = response.data;
        dispatch(userData(data.data.id, data.data.login, data.data.email, true))//resultCode находится в объекте ответа, остальные данные находятся в объекте data, вложенном в объект ответа
      }
    });
  }
}

export const loginThunkCreator = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe).then(response => {
      console.log("данные из loginThunkCreator", response.data)
      if (response.data.resultCode === 0) {
        dispatch(userDataThunkCreator());
      }
      if (response.data.messages.length !== 0) {
        dispatch(error(response.data.messages[0]));
      }
    })
  }
}

export const logoutThunkCreator = () => {
  return (dispatch) => {
    authAPI.logout().then(response => {
      console.log(response)
      if (response.data.resultCode === 0) {
        dispatch(userData(null, null, null, false));
      }
      console.log(response)
    })
  }
}

export default authReducer;