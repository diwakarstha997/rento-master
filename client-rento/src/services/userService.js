import http from "./httpService";

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
  getProfileData,
  getTotalUsers,
  usersCreatedToday,
  editProfileData,
  changePassword,
  getVerifyUser,
  verifyUser,
  declineUser,
};

export default user;
