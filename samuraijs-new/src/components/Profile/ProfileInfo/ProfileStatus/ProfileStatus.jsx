import React, { useEffect, useState } from 'react';
import styles from './ProfileStatus.module.scss';
import { getStatus, updateStatus } from '../../../../state/profileSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const ProfileStatus = (props) => {
  // debugger

  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState('');

  const statusData =  useSelector((state) => state.profile.status);
  const dispatch = useDispatch();
  console.log('statusData:', statusData)
  useEffect(() => {
    dispatch(getStatus());
  }, []);

  const enabledEditMode = () => {
    setEditMode(true);
    setLocalStatus(statusData);
  }
  const disabledEditMode = () => {
    setEditMode(false);
    if (statusData !== localStatus) {
      dispatch(updateStatus(localStatus));
      console.log('статус обновлен');
    } else {
        console.log('статус такой же, как и был');
    }
  }

  const updateStateStatus = (e) => {
    setLocalStatus(e.currentTarget.value);
  }

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      dispatch(updateStatus(e.target.value));
      setEditMode(false);
      console.log('статус обновлен');
    }
  }

  return (
    <div>
      {editMode ? <input className={styles.input} autoFocus onBlur={disabledEditMode} onKeyDown={onKeyDownHandler} value={localStatus} onChange={updateStateStatus} /> : <span className={styles.span} onClick={enabledEditMode}>{statusData}</span>}
    </div>
  )
}

export default ProfileStatus;