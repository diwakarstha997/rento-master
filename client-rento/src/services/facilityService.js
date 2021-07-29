import http from "./httpService";

const apiEndpoint = "/facility";

export function getFacilities() {
  return http.get(apiEndpoint);
}

export function addFacility(facility) {
  return http.post(apiEndpoint + "/add", facility);
}

const facility = {
  getFacilities,
};

export default facility;
