import React, {useEffect} from 'react';
import {changePage, changePageSize, getUsersData} from "../../state/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import User from "./User/User.jsx";
import UsersToolkit from "./UsersToolkit.jsx";

const UsersContainerToolkit = () => {

  const usersData = useSelector((state) => state.users)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersData({currentPage: usersData.currentPage, pageSize: usersData.pageSize}));
  }, [dispatch, usersData.currentPage, usersData.pageSize])
  // console.log(usersData)

  let pageCount = Math.ceil(usersData.totalUsersCount / usersData.pageSize);

  let pages = [];

  for (let i = 1, len = pageCount; i <= len; i++) {
    pages.push(i);
  }

  const onChangePage = (page) => {
    dispatch(changePage(page));
  }

  const onChangePageSize = (size) => {
    dispatch(changePageSize(size));
  }

  return (
    <div>
      <UsersToolkit users={usersData.users}
                    currentPage={usersData.currentPage}
                    pageSize={usersData.pageSize}
                    pages={pages}
                    onChangePage={onChangePage}
                    pageSizes={usersData.pageSizes}
                    onChangePageSize ={onChangePageSize}
      />
    </div>
  );
};

export default UsersContainerToolkit;