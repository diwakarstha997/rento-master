// import React from "react";
import auth from "../../services/authService";

const Logout = ({ user }) => {
  auth.logout();
  if (user === "Admin") return (window.location = "/Admin/login");
  return (window.location = "/login");
};

export default Logout;
