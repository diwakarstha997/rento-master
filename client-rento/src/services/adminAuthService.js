import http, { setJwt } from "./httpService";
// import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "AdminToken";

setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  console.log(jwt);
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
  loginWithJwt,
  logout,
  getCurrentUser,
};

export default auth;
