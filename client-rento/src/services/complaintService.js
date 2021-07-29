import http from "./httpService";

const apiEndpoint = "/complaint";

export function save(data, roomId) {
  data.roomId = roomId;
  return http.post(apiEndpoint, data);
}

const complaint = {
  save,
};

export default complaint;
