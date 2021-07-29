import http from "./httpService";

const apiEndpoint = "/user";

export async function register(user) {
  return await http.post(apiEndpoint + "/register", {
    email: user.email,
    password: user.password,
    name: user.name,
    phone: user.phone,
  });
}

export function getTotalUsers() {
  return http.get(apiEndpoint + "/getTotal");
}

export function usersCreatedToday() {
  return http.get(apiEndpoint + "/createdToday");
}

const user = {
  register,
  getTotalUsers,
  usersCreatedToday,
};

export default user;
