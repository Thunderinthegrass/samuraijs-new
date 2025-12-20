import { usersAPI } from "../api/api";

const ADD_USERS = "ADD-USERS";
const SET_USERS = "SET-USERS";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";

const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";

const ON_CHANGE_QUANTITY_ON_PAGE = "ON_CHANGE_QUANTITY_ON_PAGE";

const ON_IS_FETCHING = "ON_IS_FETCHING";

const ON_FOLLOWING_PROGRESS = "ON_FOLLOWING_PROGRESS";

export const addUsersAC = () => ({type: ADD_USERS});

export const follow = (userId) => ({type: FOLLOW, userId: userId});
export const unFollow = (userId) => ({type: UNFOLLOW, userId: userId});
export const setUsers = (users) => ({type: SET_USERS, users: users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const onChangeQuantityOnPage = (pageSize) => ({type: ON_CHANGE_QUANTITY_ON_PAGE, pageSize});
export const onIsFetching = (isFetching) => ({type: ON_IS_FETCHING, isFetching});
export const onFollowingProgress = (isFetching, userId) => ({type: ON_FOLLOWING_PROGRESS, isFetching, userId})

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingProgress: [],
  fake: 0
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FAKE": return {...state, fake: state.fake + 1}
    case ADD_USERS:
      console.log(state);
      return state;
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: true}
          }
          return user;
        }),
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: false}
          }
          return user;
        }),
      }
    case SET_USERS:
      return {...state, users: [...action.users]};
    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.currentPage};
    case SET_TOTAL_USERS_COUNT:
      return {...state, totalUsersCount: action.totalCount};
    case ON_CHANGE_QUANTITY_ON_PAGE:
      return {...state, pageSize: action.pageSize};
    case ON_IS_FETCHING:
      return {...state, isFetching: action.isFetching};
    case ON_FOLLOWING_PROGRESS:
      return {...state, followingProgress: action.isFetching
        ? [...state.followingProgress, action.userId]
        : state.followingProgress.filter(item => item !== action.userId)
      }
    default:
      return state;
  }
};

//thunk
export const getUsersThunkCreator = (currentPage = 1, pageSize) => {
  return (dispatch) => {
    dispatch(onIsFetching(true));
          
    usersAPI.getUsers(currentPage, pageSize).then((data) => {//getUsers находится в api.js
      dispatch(onIsFetching(false));
      dispatch(setUsers(data.items));
      // dispatch(setTotalUsersCount(data.totalCount - 27500));//приходит слишком много страниц, таким образом их количество уменьшается в 500 раз
      dispatch(setTotalUsersCount(data.totalCount));//приходит слишком много страниц, таким образом их количество уменьшается в 500 раз
      // this.props.setTotalUsersCount(response.data.totalCount);//приходят все данные
    })
  }
}

export const unfollowThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(onFollowingProgress(true, userId));
          
    usersAPI.getUnfollow(userId).then((response) => {
                                      
      if (response.data.resultCode === 0) {
        dispatch(unFollow(userId));
      }
      dispatch(onFollowingProgress(false, userId))
    })
    
  }
}
export const followThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(onFollowingProgress(true, userId));
          
    usersAPI.getFollow(userId).then((response) => {
                                      
      if (response.data.resultCode === 0) {
        dispatch(follow(userId));
      }
      dispatch(onFollowingProgress(false, userId))
    })
    
  }
}

export default usersReducer;
