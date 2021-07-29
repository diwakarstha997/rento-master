import auth from "../../services/authService";

const Logout = () => {
  auth.logout();
  window.location = "/login";
};

export default Logout;
