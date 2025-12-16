import React from "react";
import { useForm } from "react-hook-form";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../state/dialogsSlice.js";

const MessageForm = ({ onSubmit }) => {

  const {
    register,//метод, позволяющий регистрировать различные поля для формы
    handleSubmit,//метод-обертка над нашим самописным хендлером отправки формы
    reset,
    formState: {errors, isSubmitting},//в errors попадет текст ошибки под именем поля, в данном случае newMessage
  } = useForm();

  const submitHandler = async (data) => {
    await onSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <textarea
            {...register("newMessage", {
              required: "Поле заполните, будьте любезны",//теперь это поле обязательно
              minLength: {
                value: 12,
                message: "Не менее десяти символов, будьте любезны",
              },
            })}
            placeholder="Введите сообщение"
            className={errors.newMessage ? s.error : ""}
          />
          {errors.newMessage && <span className={s.errorMessage}>{errors.newMessage.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          Отправить сообщение
        </button>
    </form>
  );
};

const Dialogs = () => {

  const dialogsData = useSelector((state) => state.dialogs);
  const dispatch = useDispatch();

  let dialogs = dialogsData.dialogs.map(dialog =>
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} isActive={dialog.id === dialogsData.activeDialogId} />
  );

  const filteredMessages = dialogsData.messages.filter(message => message.dialogId === dialogsData.activeDialogId)
    .map(message => (
      <Message key={message.id} message={message.text} date={message.createdAt} id={message.id} />
    ))

  const onSubmit = (messageData) => {
    let message = messageData.newMessage;
    let activeDialogId = dialogsData.activeDialogId;
    dispatch(addMessage(message, activeDialogId))
    // form.reset(); // Очистка формы после отправки
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