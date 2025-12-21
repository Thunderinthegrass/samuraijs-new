// import React, {useEffect} from 'react';
// import User from "./User/User.jsx";
// import s from "./Users.module.scss";
//
// const UsersToolkit = ({users, currentPage, pageSize, pages, onChangePage}) => {
//   // console.log(users);
//   return (
//     <div>
//       <div className={s.pagesButtonsWrapper}>
//         {pages.map(page => <button key={page} onClick={() => onChangePage(page)}>{page}</button>)}
//       </div>
//       <div className={s.usersWrapper}>
//         {users.map((user) => (
//           <User key={user.id} name={user.name} photos={user.photos} />
//         ))}
//       </div>
//     </div>
//   );
// };
//
// export default UsersToolkit;

// UsersToolkit.jsx
import React from 'react';
import User from "./User/User.jsx";
import s from "./Users.module.scss";
import {changePageSize} from "../../state/usersSlice.js";

const UsersToolkit = ({users, currentPage, pageSize, pages, onChangePage, pageSizes, onChangePageSize, follow, unFollow}) => {


  const getVisiblePages = () => {
    const totalPages = pages.length;//длина массива страниц
    const visiblePages = [];//массив с видимыми страницами
    const maxVisible = 20; //максимальное количество показываемых кнопок/страниц
    let startPage, endPage;//начальная страница, конечная страница

    if (totalPages <= maxVisible) {
      // Если страниц меньше 10, показываем все
      startPage = 1;
      endPage = totalPages;
    } else {
      // Рассчитываем начальную и конечную страницу
      const maxVisibleBeforeCurrent = Math.floor(maxVisible / 2);
      const maxVisibleAfterCurrent = Math.ceil(maxVisible / 2) - 1;

      if (currentPage <= maxVisibleBeforeCurrent) {
        // Текущая страница в начале
        startPage = 1;
        endPage = maxVisible;
      } else if (currentPage + maxVisibleAfterCurrent >= totalPages) {
        // Текущая страница в конце
        startPage = totalPages - maxVisible + 1;
        endPage = totalPages;
      } else {
        // Текущая страница в середине
        startPage = currentPage - maxVisibleBeforeCurrent;
        endPage = currentPage + maxVisibleAfterCurrent;
      }
    }

    // Собираем видимые страницы
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return { visiblePages, totalPages, startPage, endPage };
  };

  const { visiblePages, totalPages, startPage, endPage } = getVisiblePages();

  return (
    <div>
      <div className={s.pagesButtonsWrapper}>
        {/* Кнопка "Первая" */}
        {currentPage > 1 && (
          <>
            <button onClick={() => onChangePage(1)}>Первая страница</button>
            {startPage > 1 && <span className={s.dots}> . . . </span>}
          </>
        )}

        {/* Основные кнопки страниц */}
        {visiblePages.map(page => (
          <button
            key={page}
            onClick={() => onChangePage(page)}
            className={currentPage === page ? s.activePage : ''}
          >
            {page}
          </button>
        ))}

        {/* Кнопка "Последняя" */}
        {currentPage < totalPages && (
          <>
            {endPage < totalPages && <span className={s.dots}> . . . </span>}
            <button onClick={() => onChangePage(totalPages)}>Последняя страница</button>
          </>
        )}
      </div>
      <div className="buttonsWrapper">
        <span>Сколько пользователей на страницу выводить: </span>
        {pageSizes.map(pageSize => <button key={pageSize} onClick={() => onChangePageSize(pageSize)}>{pageSize}</button>)}
      </div>
      <div className={s.usersWrapper}>
        {users.map((user) => (
          <User key={user.id} name={user.name} photos={user.photos} followed={user.followed} userId={user.id} follow={follow} unFollow={unFollow} />
        ))}
      </div>
    </div>
  );
};

export default UsersToolkit;