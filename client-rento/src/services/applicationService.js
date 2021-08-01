import http from "./httpService";

const apiEndpoint = "/application";

export function save(data, roomId) {
  data.roomId = roomId;
  return http.post(apiEndpoint, data);
}

export function getTenantApplications() {
  return http.get(apiEndpoint + "/TenantApplications");
}

export function getRoomOwnerApplications() {
  return http.get(apiEndpoint + "/RoomOwnerApplications");
}

export function checkExistingApplication(roomId) {
  console.log(roomId);
  return http.get(apiEndpoint + "/room/" + roomId);
}

export function findApplication(applicationId) {
  console.log(applicationId);
  return http.get(apiEndpoint + "/application/" + applicationId);
}

const application = {
  save,
  checkExistingApplication,
  findApplication,
};

export default application;
