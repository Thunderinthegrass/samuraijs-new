import dialogsReduser from "./dialogs-reduser";
import newsReduser from "./news-reduser";
import profileReducer from "./profile-reduser";

export const store = {
  _state: {
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Александр" },
        { id: 2, name: "Федор" },
        { id: 3, name: "Селиван" },
        { id: 4, name: "Дед Вовка" },
      ],
      messages: [
        { id: 1, message: "На болоте туман" },
        { id: 2, message: "В урочище ясно" },
        { id: 3, message: "Изба стоит" },
      ],
      newMessageText: "",
    },
    profilePage: {
      newPostText: "",
      posts: [
        { id: 1, message: "Пост", likes: 15 },
        { id: 2, message: "Пост", likes: 17 },
        { id: 3, message: "Пост", likes: 12 },
        { id: 4, message: "Пост", likes: 20 },
      ],
    },
    friendsPage: {
      friends: [
        { id: 1, name: "Митя", imgPath: "https://avatars.dzeninfra.ru/get-zen_doc/62191/pub_5d46ef138da1ce00af96680b_5d472c4ae6cb9b00ad5bdddb/scale_1200" },
        { id: 2, name: "Мотя", imgPath: "https://avatars.dzeninfra.ru/get-zen_doc/1866101/pub_6503e42bffb3f010e7c18488_6503e889f277c224a7deeed4/scale_1200" },
      ]
    },
    newsPage: {
      newNewsText: "",
      news: [
        { id: 1, news: "Новость" },
        { id: 2, news: "Новость" },
        { id: 3, news: "Новость" },
      ]
    }
  },
  _callSubscriber() {
    console.log('ggg');
  
  },
  subscribe (observer) {
    this._callSubscriber = observer;
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReduser(this._state.dialogsPage, action);
    this._state.newsPage = newsReduser(this._state.newsPage, action);

    this._callSubscriber(this._state);
  },
};


