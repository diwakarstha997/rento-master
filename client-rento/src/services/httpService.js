import axios from "axios";

axios.defaults.baseURL = "http://localhost:3900/api";
// axios.defaults.baseURL = "http://192.168.10.13:3900/api";

// handling unexpected error globally
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    alert("An unexpected error occured");
  }

  return Promise.reject(error);
});

//replaced code to avoid bidirectional dependencies(Services calling each other)
// axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
