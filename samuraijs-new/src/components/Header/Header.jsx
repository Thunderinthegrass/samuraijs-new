import React, { useEffect } from "react";
import s from './Header.module.scss';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logout } from "../../state/authSlice";

const Header = (props) => {

  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])
  // console.log(authData)
  
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img
          className={s.logoImg}
          src="https://i.pinimg.com/736x/1c/73/dc/1c73dc41799f7411a0473102e3971230.jpg"
          alt="Логотип"
        />
      </div>
      <NavLink className={s.loginLink} to={`${authData.isAuth ? '/' : '/LoginFinal'}` }>
        {authData.isAuth ? authData.login : 'Login'}
      </NavLink>
      {authData.isAuth ? <button onClick={() => dispatch(logout())}>Выйти</button> : <NavLink className={s.loginBtn} to={'/LoginFinal'}>Войти</NavLink>}
    </header>
  );
};

export default Header;
