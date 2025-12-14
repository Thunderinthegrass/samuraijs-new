// import React from "react";
import Friends from './Friends';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    friendsPage: state.friendsPage
  }
}

const FriendsContainer = connect(mapStateToProps)(Friends);

export default FriendsContainer;