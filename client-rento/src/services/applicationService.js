import http from "./httpService";

const apiEndpoint = "/application";

export function save(data, roomId) {
  data.roomId = roomId;
  return http.post(apiEndpoint, data);
}

export function checkExistingApplication(roomId) {
  return http.get(apiEndpoint + "/" + roomId);
}

const application = {
  save,
  checkExistingApplication,
};

export default application;
