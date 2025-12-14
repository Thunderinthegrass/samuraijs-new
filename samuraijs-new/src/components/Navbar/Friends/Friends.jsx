import React from "react";
import s from "./Friends.module.css";
import Friend from "./Friend/Friend";

const Friends = (props) => {
// debugger
  let friend = props.friendsPage.friends.map(friend => <Friend name={friend.name} imgPath={friend.imgPath} />)

  return (
    <div className={s.friendsWrapper}>
      { friend }
    </div>
  )
}

export default Friends;