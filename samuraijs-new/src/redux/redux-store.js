import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reduser";
import dialogsReduser from "./dialogs-reduser";
import newsReduser from "./news-reduser";
import friendsReduser from "./friends-reduser";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import {thunk} from "redux-thunk";
// import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReduser,
  newsPage: newsReduser,
  friendsPage: friendsReduser,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer
  // form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;//это для того, чтобы можно было в консоли посмотреть store

export default store;