import React, { useEffect } from "react";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import banner1 from "../../assets/banner/banner-1.jpg";
import banner2 from "../../assets/banner/banner-2.jpeg";
import MyPosts from "./MyPosts/MyPosts";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../state/profileSlice";
import { getUsersData } from "../../state/usersSlice";

const Profile = (props) => {
  // debugger

  const profileData = useSelector((state) => state.profile)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profileData.userData) {
      dispatch(getUserData());
      // dispatch(getUsersData())
    }
  }, [])

  return (
    <div>
      <div className={s.banner}>
        <img
          className={s.bannerImg}
          src={banner1}
          alt=""
        />
        <img
          className={s.bannerImg}
          src={banner2}
          alt=""
        />
      </div>
      <ProfileInfo userData={profileData.userData} />
      <MyPosts posts={ profileData.posts } />
      Main content
    </div>
  );
};

export default Profile;
