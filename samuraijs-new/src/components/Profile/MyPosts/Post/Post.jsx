import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  
  return (
    <div className={`${s.item} ${s.post}`}>{props.id}. {props.message} <br/>  {props.likes}</div>
  )
}

export default Post;