import { connect } from "react-redux";
import { follow, unFollow, setCurrentPage, onChangeQuantityOnPage, onFollowingProgress, getUsersThunkCreator, unfollowThunkCreator, followThunkCreator } from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from 'redux';
import { getCurrentPage, getFollowingProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersSelector, getUsersSuperSelector } from "../../redux/users-selectors";


class UsersContainerComponent extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
  }

  onPageChanged = (page) => {
    this.props.getUsers(page, this.props.pageSize);
    this.props.setCurrentPage(page);
  }

  addNewQuantityUsers = (pageSize) => {
    this.props.getUsers(this.props.currentPage, pageSize);
  }

  render() {
    return (
      <>
        { this.props.isFetching ? <Preloader /> : null }
        <Users 
              onPageChanged={this.onPageChanged}
              users={this.props.users}
              pageSize={this.props.pageSize}
              totalUsersCount={this.props.totalUsersCount}
              currentPage={this.props.currentPage}
              onChangeQuantityOnPage={this.props.onChangeQuantityOnPage}
              addNewQuantityUsers={this.addNewQuantityUsers}
              followingProgress={this.props.followingProgress}
              unfollowThunkCreator={this.props.unfollowThunkCreator}
              followThunkCreator={this.props.followThunkCreator}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  // debugger
  console.log("перерисовка каждую секунду")
  return {
    users: getUsersSuperSelector(state),//будет перерисовываться mapStateToProps, но не будет происходить перерисовкак компонента, т.к. reselect сравнивает вновь пришедшие данные с теми, что уже есть, и видит, что приходит новый массив, но с такими же данными, и не перерисовывает компонент
    // users: getUsersSelector(state),//каждую секунду будет обновление mapStateToProps и будет происходить перерисовка, т.к. каждый раз возвращается другой массив, пусть и такой же, как и предыдущий
    // users: getUsers(state),//будет обновление mapStateToProps каждую секунду, но не будет перерисовки, потому что не изменяется массив с данными
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingProgress: getFollowingProgress(state)
  }
}

const mapDispatchToProps = {
    follow,
    unFollow,
    setCurrentPage,
    onChangeQuantityOnPage,
    onFollowingProgress,
    getUsers: getUsersThunkCreator,
    unfollowThunkCreator,
    followThunkCreator
}

//сначала было так
// let withRedirect = withAuthRedirect(UsersContainerComponent);
// const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(withRedirect);//Более громоздкая запись

//потом стало так
// withAuthRedirect()

// export default withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(UsersContainerComponent));//hoc withAuthComponent принимает в качестве параметра usersContainerComponent, к которому уже законнекчкн стейт

//потом так
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // withAuthRedirect
)(UsersContainerComponent);