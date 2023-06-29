import { useState, useEffect, useContext } from "react";

import CustomHead from "../components/CustomHead";
import NavBar from "./NavBar";
import Footer from "../components/Footer";

function Layout(props) {
  return (
    <>
      <CustomHead />
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
