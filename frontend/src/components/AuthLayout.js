import React from "react";
import BG_IMG from "../assets/home.jpg"; // background image
import "../CSS/auth.css"; // import CSS file

const AuthLayout = ({ children }) => {
  return (
    <div
      className="auth-layout"
      style={{ backgroundImage: `url(${BG_IMG})` }} 
    >
      <div className="auth-left">{children}</div>
    </div>
  );
};

export default AuthLayout;
