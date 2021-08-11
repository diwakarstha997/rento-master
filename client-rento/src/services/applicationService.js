import http from "./httpService";

const apiEndpoint = "/application";

export function save(data, roomId) {
  const formData = { ...data, roomId: roomId };
  return http.post(apiEndpoint, formData);
}

export function getTenantApplications() {
  return http.get(apiEndpoint + "/TenantApplications");
}

export function getRoomOwnerApplications() {
  return http.get(apiEndpoint + "/RoomOwnerApplications");
}

export function checkExistingApplication(roomId) {
  return http.get(apiEndpoint + "/room/" + roomId);
}

export function findApplication(applicationId) {
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
  additionalComments,
  pets,
  noOfRoomMates,
  noOfChildrens
) {
  return http.put(apiEndpoint + "/edit/" + applicationId, {
    occupation,
    monthlyIncome,
    emergencyContact,
    previousLocation,
    reasonToLeavePreviousLocation,
    additionalComments,
    pets,
    noOfRoomMates,
    noOfChildrens,
  });
}

export function applicationApprove(applicationId) {
  return http.put(apiEndpoint + "/approve/" + applicationId);
}

export function applicationReject(applicationId) {
  return http.put(apiEndpoint + "/reject/" + applicationId);
}

export function applicationView(applicationId) {
  return http.put(apiEndpoint + "/view/" + applicationId);
}

export function applicationView2(applicationId) {
  return http.put(apiEndpoint + "/view2/" + applicationId);
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
  applicationView,
  applicationView2,
};

export default application;
