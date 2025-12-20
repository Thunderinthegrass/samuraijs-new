import React from 'react';
import s from "./Users.module.scss";
import userImage from "../../assets/images.png";
import {NavLink} from "react-router-dom";

const Users = (props) => {
  // debugger
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);//получаем количество страниц, если остаток - округляем в большую сторону

  let pages = [];//объявляем массив
  for (let i = 1; i <= pagesCount; i++) {//заполняем массив числами, каждое число - номер страницы и пушим их в массив
    pages.push(i);
  }

  const changePageSize = (e) => {//функция изменения количества элементов на каждой странице, то есть сколько человек одновременно выводить
    let pageSize = e.currentTarget.dataset.value;

    props.onPageChanged(1);//откатываемся к первой странице после обновления количества элементов на странице
    props.onChangeQuantityOnPage(pageSize);//меняем в стейте число, обозначающее количество пользователей на странице
    props.addNewQuantityUsers(pageSize);//делаем переотправку, чтоб обновленные данные подтянуть
    props.addNewQuantityUsers(pageSize);//делаем переотправку, чтоб обновленные данные подтянуть
  }
  console.log("компонент тоже перерисовывается")
  return <div className={s.users}>
    {
      pages.map(page => {//отрисовываем кнопки
        return <button key={page} className={props.currentPage === page ? s.selectedPage : s.page}
                       onClick={() => {props.onPageChanged(page)}}>
          {page}
        </button>
      })
    }

    <div className={s.container}>
      <div className={s.showBy}>
        <button>показать по</button>
        <button onClick={changePageSize} data-value="5" >5</button>
        <button onClick={changePageSize} data-value="10" >10</button>
        <button onClick={changePageSize} data-value="100" >100</button>
        {/* <button onClick={changePageSize} data-value="10000" >1000</button> здесь ошибка почему-то */}
      </div>
      <div className={s.usersWrapper}>
        {
          props.users.map( user =>
              <div className={s.user} key={user.id} >
                <NavLink to={`/profile/${user.id}`} className={s.userLink} key={user.id}>{/*сюда подставляется айдишник юзера*/}
                  <div className={s.userImgWrapper}>
                    <img src={user.photos.large !== null ? user.photos.large : userImage} alt="" className={s.userImg} />
                  </div>
                  <div className={s.userInfo}>
                    <div className={s.userInfoItem}><span className={s.punkt}>Имя: </span>{user.name}</div>
                  </div>
                </NavLink>
                {user.followed
                  ? <button className={props.followingProgress.some(item => item === user.id) ? `${s.followBtn} ${s.disabledBtn}` : s.followBtn} 
                            onClick={() => {
                              props.unfollowThunkCreator(user.id);
                            }} 
                            disabled={props.followingProgress.some(item => item === user.id)}
                            >
                      Отписаться
                    </button>
                  : <button className={props.followingProgress.some(item => item === user.id) ? `${s.followBtn} ${s.disabledBtn}` : s.followBtn}
                            onClick={() => {
                              props.followThunkCreator(user.id)
                            }}
                            disabled={props.followingProgress.some(item => item === user.id)}
                            >
                      Подписаться
                    </button>
                }
              </div>
          )
        }
      </div>
    </div>
  </div>
}

export default Users;