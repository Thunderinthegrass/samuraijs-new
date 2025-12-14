import React from "react";
import { Form, Field } from "react-final-form";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { useDispatch } from "react-redux";
import { addPost } from "../../../state/profileSlice";

const PostForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPostTextarea"></label>
          <Field name="newPost">
            {({ input, meta }) => (
              <div>
                <textarea 
                  {...input} 
                  id="newPostTextarea"
                  placeholder="добавить пост"
                  className={meta.error && meta.touched ? s.error : ""}
                />
                {meta.error && meta.touched && <span className={s.errorMessage}>{meta.error}</span>}
              </div>
            )}
          </Field>
          <button type="submit" disabled={submitting}>
            Добавить пост
          </button>
        </form>
      )}
    </Form>
  );
};

const MyPosts = (props) => {

  const dispatch = useDispatch();

  let postsElements = props.posts.map(post => 
    <Post key={post.id} id={post.id} message={post.message} likes={post.likes} />
  );

  const onSubmit = (formData, form) => {
    console.log("postForm:", formData);
    // props.addPost(formData.newPost);
    const message = formData.newPost
    dispatch(addPost(message));
    form.reset(); // Очистка формы после отправки
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