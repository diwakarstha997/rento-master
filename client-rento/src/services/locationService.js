import http from "./httpService";

const apiEndpoint = "/city";

export function getCities() {
  return http.get(apiEndpoint);
}

export function addCity(name, totalWard, lng, lat, zoom, marker) {
  return http.post(apiEndpoint + "/add", {
    name,
    totalWard,
    lng,
    lat,
    zoom,
    marker,
  });
}

export function editCity(id, name, totalWard) {
  return http.put(apiEndpoint + "/edit/" + id, { name, totalWard });
}

export function deleteCity(id) {
  return http.delete(apiEndpoint + "/delete/" + id);
}

const city = {
  getCities,
  addCity,
  deleteCity,
  editCity,
};

export default city;
