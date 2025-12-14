import {createSlice, nanoid, type PayloadAction} from "@reduxjs/toolkit";

interface Dialog {
  id: string;
  name: string;
}

interface Message {
  id: string;
  dialogId: string;
  text: string;
  createdAt: string | null;
}

interface DialogsState {
  dialogs: Dialog[];
  messages: Message[];
  activeDialogId: string | null;
}

const initialState: DialogsState = {
  dialogs: [
    { id: "1", name: "Александр Петров" },
    { id: "2", name: "Федор Пнев" },
    { id: "3", name: "Охотник Селиван" },
    { id: "4", name: "Дед Вовка" },
  ],
  messages: [
    { id: "1", dialogId: "1", text: "На болоте туман", createdAt: null },
    { id: "2", dialogId: "2", text: "В урочище ясно", createdAt: null },
    { id: "3", dialogId: "3", text: "Ну здравствуй, дед Вовка", createdAt: null },
    { id: "4", dialogId: "4", text: "Ну привет, Селиван", createdAt: null },
  ],
  activeDialogId: "1"
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setActiveDialog: (state, action: PayloadAction<string>) => {
      state.activeDialogId = action.payload;
    },
    addMessage: {
      reducer: (state, action: PayloadAction<Message>) => {
        state.messages.push(action.payload);
      },
      prepare: (text: string, dialogId: string) => ({
        payload: {
          id: nanoid(),
          dialogId,
          text,
          createdAt: new Date().toISOString()
        } as Message,
      })
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
    }
  }
})


export const dialogsReducer = dialogsSlice.reducer;
export const { addMessage, deleteMessage, setActiveDialog } = dialogsSlice.actions;
