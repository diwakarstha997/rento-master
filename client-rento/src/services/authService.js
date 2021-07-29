import http, { setJwt } from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "token";

setJwt(getJwt());

export async function login(userRole, email, password) {
  //username to lower case
  email = email.toLowerCase();

  //call to server api
  const { data: jwt } = await http.post(apiEndpoint, {
    userRole,
    email,
    password,
  });

  //check if userRole is User
  const user = jwtDecode(jwt);
  if (user.role !== "Admin") localStorage.setItem(tokenKey, jwt);
  else {
    let err = { response: { status: "", data: "" } };
    err.response.status = 400;
    err.response.data = "Invalid Email/ Password";
    throw err;
  }
}

export async function adminLogin(email, password) {
  const { data: jwt } = await http.post(apiEndpoint + "/adminLogin", {
    email,
    password,
  });
  console.log("test" + jwt);
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  return localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  adminLogin,
  loginWithJwt,
  logout,
  getCurrentUser,
};

export default auth;
