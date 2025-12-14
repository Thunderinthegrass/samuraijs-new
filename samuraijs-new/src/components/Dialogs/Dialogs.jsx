import React from "react";
import { Form, Field } from "react-final-form";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../state/dialogsSlice.js";

const MessageForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="newMessage">
            {({ input, meta }) => (
              <div>
                <textarea 
                  {...input} 
                  placeholder="Введите сообщение"
                  className={meta.error && meta.touched ? s.error : ""}
                />
                {meta.error && meta.touched && <span className={s.errorMessage}>{meta.error}</span>}
              </div>
            )}
          </Field>
          <button type="submit" disabled={submitting}>
            Отправить сообщение
          </button>
        </form>
      )}
    </Form>
  );
};

const Dialogs = (props) => {

  const dialogsData = useSelector((state) => state.dialogs);
  const dispatch = useDispatch();

  let dialogs = dialogsData.dialogs.map(dialog => 
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} isActive={dialog.id === dialogsData.activeDialogId} />
  );

  const filteredMessages = dialogsData.messages.filter(message => message.dialogId === dialogsData.activeDialogId)
    .map(message => (
      <Message key={message.id} message={message.text} date={message.createdAt} id={message.id} />
    ))

  const onSubmit = (messageData, form) => {
    let message = messageData.newMessage;
    let activeDialogId = dialogsData.activeDialogId;
    dispatch(addMessage(message, activeDialogId))
    form.reset(); // Очистка формы после отправки
  };

  return (
    <div className={s.dialogsWrapper}>
      <div className={s.dialogs}>
        {dialogs}
      </div>
      <div className={s.messages}>
        <div className={s.messagesWrapper}>
          {filteredMessages}
        </div>
        <div className={s.textareaWrapper}>
          <MessageForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;