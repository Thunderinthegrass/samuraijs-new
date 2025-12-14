import React from "react";
import s from "./Message.module.css";
import { deleteMessage } from "../../../state/dialogsSlice.js";
import { useDispatch } from "react-redux";

const Message = (props) => {

  const dispatch = useDispatch();

  const deleteMessageHandler = (id) => {
  dispatch(deleteMessage(id))
  console.log(id)
}

  return (
    <div className={s.message}>
      <span>{props.message}</span>
      <button onClick={() => deleteMessageHandler(props.id)}>Удалить</button>
    </div>
  )
}

export default Message;