import React from "react";
import s from "./ProfileInfo.module.css";
import leopold from "../../../assets/leopold.jpg";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
// import { userData } from "../../../redux/auth-reducer";

const ProfileInfo = (props) => {
  // debugger
  if (!props.userData) {
    // console.log(userData)
    return <Preloader />;
  }
  console.log(props.userData)
  return (
    <div className={s.user}>
        <div className={s.userImgWrapper}>
          <img
          src={leopold}
          alt=""
          className={s.userImg}
        />
        </div>
        <div className={s.userName}>
          <ProfileStatus />
        </div>
      </div>
  )
}

export default ProfileInfo;