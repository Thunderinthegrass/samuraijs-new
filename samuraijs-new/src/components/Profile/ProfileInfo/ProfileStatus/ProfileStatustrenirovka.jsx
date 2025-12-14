import React, { useState } from 'react';
import styles from "./ProfileStatus.module.scss";

const ProfileStatustrenirovka = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState('');

  const editModeHandle = (e) => {
    setEditMode(true);
    setStatus(props.status);
  }

  const onChangeHandler = (e) => {
    setStatus(e.target.value);
  }

  const onBlurHandle = (e) => {
    props.updateStatus(e.target.value);
    setEditMode(false);
  }

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      props.updateStatus(e.target.value);
      setEditMode(false);
    }
  }
 
  return (
    <div>
      {editMode ? <input type="text" onChange={onChangeHandler} onBlur={onBlurHandle} onKeyDown={onKeyDownHandler} value={status} placeholder={props.status}/> : <button onClick={editModeHandle}>{props.status}</button>}
    </div>
  )
}

export default ProfileStatustrenirovka