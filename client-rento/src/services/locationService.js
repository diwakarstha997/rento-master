import http from "./httpService";

const apiEndpoint = "/city";

export function getCities() {
  return http.get(apiEndpoint);
}

export function addCity(city) {
  return http.post(apiEndpoint + "/add", city);
}

const city = {
  getCities,
};

export default city;
