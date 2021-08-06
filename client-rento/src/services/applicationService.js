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

export function cancelApplication(applicationId) {
  return http.put(apiEndpoint + "/cancel/" + applicationId);
}

export function editApplication(
  applicationId,
  occupation,
  monthlyIncome,
  emergencyContact,
  previousLocation,
  reasonToLeavePreviousLocation,
  additionalComments
) {
  return http.put(apiEndpoint + "/edit/" + applicationId, {
    occupation,
    monthlyIncome,
    emergencyContact,
    previousLocation,
    reasonToLeavePreviousLocation,
    additionalComments,
  });
}

export function applicationApprove(applicationId) {
  return http.put(apiEndpoint + "/approve/" + applicationId);
}

export function applicationReject(applicationId) {
  return http.put(apiEndpoint + "/reject/" + applicationId);
}

const application = {
  save,
  checkExistingApplication,
  findApplication,
  editApplication,
  getTenantApplications,
  cancelApplication,
  applicationApprove,
  applicationReject,
};

export default application;
