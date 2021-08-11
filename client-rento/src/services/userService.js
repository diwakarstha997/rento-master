import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/user";

export async function register(user) {
  user.email = user.email.toLowerCase();
  return await http.post(apiEndpoint + "/register", {
    userRole: user.userRole,
    email: user.email,
    password: user.password,
    name: user.name,
    phone: user.phone,
  });
}

export async function getUserById(user) {
  return await http.get(apiEndpoint + "/" + user);
}

export function getProfileData() {
  return http.get(apiEndpoint);
}

export function editProfileData(id, name, email, phone) {
  return http.put(apiEndpoint + "/editProfile", { id, name, email, phone });
}

export function changePassword(id, userRole, password, password1, password2) {
  return http.put(apiEndpoint + "/changePassword", {
    id,
    userRole,
    password,
    password1,
    password2,
  });
}

export function getTotalUsers() {
  return http.get(apiEndpoint + "/getTotal");
}

export function usersCreatedToday() {
  return http.get(apiEndpoint + "/createdToday");
}

export function documentUpload(fileData) {
  let document = new FormData();
  document.append("file", fileData.image);
  return http.post(apiEndpoint + "/documentUpload", document);
}

export function activateEmail(activationToken) {
  return http.get(apiEndpoint + "/activation/" + activationToken);
}

export async function checkUserVerification() {
  const { data: jwt } = await http.get(apiEndpoint + "/checkUserVerification");
  localStorage.setItem("uv_token", jwt);
}

export function getUserVerificationData() {
  try {
    const jwt = localStorage.getItem("uv_token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function mailResend() {
  return http.get(apiEndpoint + "/mailResend");
}

export function forgotPasswordEmail(email) {
  return http.post(apiEndpoint + "/forgotPassword", email);
}

export function changePasswordTokenCheck(token) {
  return http.post(apiEndpoint + "/changePasswordTokenCheck", { token });
}

export function changePasswordByToken(token, password1, password2) {
  return http.post(apiEndpoint + "/changePasswordByToken", {
    token,
    password1,
    password2,
  });
}

export function getVerifyUser() {
  return http.get(apiEndpoint + "/getVerifyUser");
}

export function verifyUser(userId) {
  return http.put(apiEndpoint + "/verify/", { userId });
}

export function declineUser(userId) {
  return http.put(apiEndpoint + "/decline/", { userId });
}

const user = {
  register,
  getUserById,
  getProfileData,
  getTotalUsers,
  usersCreatedToday,
  editProfileData,
  changePassword,
  activateEmail,
  checkUserVerification,
  getUserVerificationData,
  mailResend,
  forgotPasswordEmail,
  changePasswordTokenCheck,
  changePasswordByToken,
  getVerifyUser,
  verifyUser,
  declineUser,
};

export default user;
