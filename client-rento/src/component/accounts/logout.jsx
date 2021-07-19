import auth from "../../services/authService";

const Logout = () => {
  auth.logout();
  window.location = "/";
};

export default Logout;
