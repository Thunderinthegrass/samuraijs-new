// по 19 во второй, 21 в третью
import React from "react";
import preloader from "../../../assets/loader.svg";
import s from "./Preloader.module.css";


const Preloader = () => {
  return (
    <div className={s.container}>
      <img src={preloader} alt="прелоадер"/>
    </div>
  )
}

export default Preloader;