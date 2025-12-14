import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import { useParams } from "react-router-dom";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from 'redux';

function withRouter(WrappedComponent) {
  return (props) => {//проверяем, передается ли параметр userId, и если нет, то ничего не делаем.
    const match = {params: useParams()}; //Здесь каким-то образом появляется айдишник, переданный в NavLink при отрисовке
    // console.log(match);
    return <WrappedComponent {...props} match={match} />;
  }
}

class ProfileContainerComponent extends React.Component {

  render() {

    return (
      <Profile {...this.props}/>//если из контейнерной компоненты прокидываем все пропсы, которые в нее приходят, то можно писать так
    );
  }
}

let composed = compose(
  withRouter,
  // withAuthRedirect//убрал перенаправление, пока не разберусь с авторизацией
)

export default composed(ProfileContainerComponent);
