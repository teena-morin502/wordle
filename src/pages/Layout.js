import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";

function Layout() {
  const location = useLocation();

  // Routes where Nav should be hidden
  const hideNavRoutes = ["/", "/register"];
  const hideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {!hideNav && <Nav />}
      <Outlet />
    </>
  );
}

export default Layout;
