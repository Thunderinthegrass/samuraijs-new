const ADD_NEW_NEWS_TEXT = "ADD-NEW-NEWS-TEXT";
const ADD_NEWS = "ADD-NEWS";

export const addNewNewsTextActionCreator = (news) => ({type: ADD_NEW_NEWS_TEXT, news: news});
export const addNewsActionCreator = (news) => ({type: ADD_NEWS, news});

let initialState = {
      newNewsText: "",
      news: [
        { id: 1, news: "Новость" },
        { id: 2, news: "Новость" },
        { id: 3, news: "Новость" },
      ]
    };

const newsReduser = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_NEWS_TEXT:
      return {
        ...state,
        newNewsText: action.news
      };
    case ADD_NEWS:
      const newNews = {
        id: state.news.length + 1,
        news: action.news,
      }
      return {
        ...state,
        news: [...state.news, newNews],
        newNewsText: ""
      };
    default: return state;
  }
}

export default newsReduser;


