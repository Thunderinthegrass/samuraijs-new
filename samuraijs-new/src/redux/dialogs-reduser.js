const ADD_MESSAGE = "ADD-MESSAGE";
// const ADD_NEW_MESSAGE_TEXT = "ADD-NEW-MESSAGE-TEXT";

// export const addNewMessageTextActionCreator = (text) => ({type: ADD_NEW_MESSAGE_TEXT, text: text});
export const addMessageActionCreator = (message) => ({type: ADD_MESSAGE, message});

let initialState = {
      dialogs: [
        { id: 1, name: "Александр Петров" },
        { id: 2, name: "Федор Пнев" },
        { id: 3, name: "Охотник Селиван" },
        { id: 4, name: "Дед Вовка" },
      ],
      messages: [
        { id: 1, message: "На болоте туман" },
        { id: 2, message: "В урочище ясно" },
        { id: 3, message: "Изба стоит" },
      ],
    };

const dialogsReduser = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const messageId = state.messages.length + 1;

      const message = {
        id: messageId,
        message: action.message,
      }

      let stateCopy = {...state};

      stateCopy.messages = [...state.messages];
      stateCopy.messages.push(message);

      // console.log(state)
      return stateCopy;
    default: return state;
  }
}

export default dialogsReduser;