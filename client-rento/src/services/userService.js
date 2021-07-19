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
