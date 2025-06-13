import React from "react";
import Navbar from "../dashboard/components/Navbar";

const WithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default WithNavbar;
