import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { useDispatch } from "react-redux";
import { addPost } from "../../../state/profileSlice.js";
import {useForm} from "react-hook-form";

const PostForm = ({ onSubmit }) => {
  // debugger
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
                  {
                    ...register("newPost", {
                      required: "Нельзя не заполнить это поле",
                      minLength: {
                        value: 10,
                        message: "Не менее десяти символов, будьте любезны",
                      },
                    })
                  }
                  placeholder="Введите текст поста"
                  className={errors.newPost ? s.error : ""}
                />
            {errors.newPost && <span className={s.error}>{errors.newPost.message}</span>}
          </div>
      <button type="submit" disabled={isSubmitting}>
        Добавить пост
      </button>
    </form>
  );
};

const MyPosts = (props) => {

  const dispatch = useDispatch();

  let postsElements = props.posts.map(post => 
    <Post key={post.id} id={post.id} message={post.message} likes={post.likes} />
  );

  const onSubmit = (formData) => {
    console.log("postForm:", formData);
    // props.addPost(formData.newPost);
    const message = formData.newPost
    dispatch(addPost(message));
  };

  return (
    <div className={s.postsWrapper}>
      <div className="new-post">
        <PostForm onSubmit={onSubmit} />
      </div>
      <div className="posts">
        {postsElements}
      </div>
    </div>
  );
};

export default MyPosts;