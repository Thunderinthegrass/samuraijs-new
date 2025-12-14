import React from "react"
import { NavLink } from "react-router-dom";
import s from "./DialogItem.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setActiveDialog} from "../../../state/dialogsSlice.js";

const DialogItem = (props) => {

  const dispatch = useDispatch();

  const setActiveId = (id) => {
    dispatch(setActiveDialog(id));
  }

  return (
    <div className={props.isActive ? `${s.dialogItem} ${s.active}` : s.dialogItem} onClick={() => setActiveId(props.id)}>
      {/*<NavLink to={`/Dialogs/${props.id}`}>{props.name}</NavLink>*/}
      <div>{props.name}</div>
    </div>
  )
}

export default DialogItem;