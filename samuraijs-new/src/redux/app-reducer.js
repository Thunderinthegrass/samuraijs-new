import { userDataThunkCreator } from "./auth-reducer";

let initialState = {
  initialized: false
}

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
}

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(userDataThunkCreator())

  promise.then(() => {
    dispatch(initializedSuccess());
  });
}

export default appReducer;