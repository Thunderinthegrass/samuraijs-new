import React from 'react';
import Navbar from "./Navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";
import Header from "./Header/Header.jsx";

function Layout(props) {
  return (
    <>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;