import React from "react";
import s from "./Friend.module.css";
import { NavLink } from "react-router-dom";

const Friend = (props) => {
  return (
    <div className={s.friend}>
      <NavLink className={({isActive}) => isActive ? s.friendLinkActive : s.friendLink} to="/FriendPage">
        <div className={s.imgWrapper}>
          <img className={s.friendImg} src={props.imgPath} alt="" />
        </div>
        <div className={s.friendName}>{props.name}</div>
      </NavLink>
    </div>
  );
};

export default Friend;
