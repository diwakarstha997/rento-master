import http from "./httpService";

const apiEndpoint = "/facility";

export function getFacilities() {
  return http.get(apiEndpoint);
}

export function addFacility(name, icon) {
  return http.post(apiEndpoint + "/add", { name, icon });
}

export function editFacility(id, name, icon) {
  return http.put(apiEndpoint + "/edit/" + id, { name, icon });
}

export function deleteFacility(id) {
  return http.delete(apiEndpoint + "/delete/" + id);
}

const facility = {
  getFacilities,
  addFacility,
  deleteFacility,
  editFacility,
};

export default facility;
