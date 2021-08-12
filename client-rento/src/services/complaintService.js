import http from "./httpService";

const apiEndpoint = "/complaint";

export function save(data, roomId) {
  data.roomId = roomId;
  return http.post(apiEndpoint, data);
}

export function getComplaints() {
  return http.get(apiEndpoint);
}

export function approve(id) {
  return http.put(apiEndpoint + "/approve/" + id);
}

export function reject(id) {
  return http.put(apiEndpoint + "/reject/" + id);
}

export function getComplaintbyId(id) {
  return http.get(apiEndpoint + "/" + id);
}

const complaint = {
  save,
  getComplaints,
  approve,
  reject,
  getComplaintbyId,
};

export default complaint;
