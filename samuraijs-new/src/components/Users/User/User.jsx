import React from "react";
import s from "./User.module.css";
import userImage from "../../../assets/images.png";

const User = ({name, photos, followed, userId, follow, unFollow}) => {
  // debugger
  return (
    <div className={s.user}>
      <div className={s.userImgWrapper}>
        <img src={photos.small ? photos.small : userImage} alt="" className={s.userImg} />
      </div>
      <div className={s.userInfo}>
        <div className={s.userInfoItem}><span className={s.punkt}>Имя: </span>{name}</div>
        {/*<div className={s.userInfoItem}><span className={s.punkt}>Возраст: </span>{props.data.characteristic.age}</div>*/}
        {/*<div className={s.userInfoItem}><span className={s.punkt}>Страна: </span>{props.data.location.country}</div>*/}
        {/*<div className={s.userInfoItem}><span className={s.punkt}>Город: </span>{props.data.location.locality}</div>*/}
        {/*<div className={s.userInfoItem}><span className={s.punkt}>Адрес: </span>{props.data.location.address}</div>*/}
      </div>
      {followed ? (
        <button className={s.followBtn} onClick={() => unFollow(userId) }>Отписаться</button>
      ) : (
        <button className={s.followBtn} onClick={() => follow(userId) } >Подписаться</button>
      )}
    </div>
  )
}

export default User;
