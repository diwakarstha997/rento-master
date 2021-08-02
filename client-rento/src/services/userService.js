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

export function getTotalUsers() {
  return http.get(apiEndpoint + "/getTotal");
}

export function usersCreatedToday() {
  return http.get(apiEndpoint + "/createdToday");
}

const user = {
  register,
  getProfileData,
  getTotalUsers,
  usersCreatedToday,
};

export default user;
