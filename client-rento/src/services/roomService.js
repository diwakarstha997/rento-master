import http from "./httpService";

const apiEndpoint = "/room";

export function getRooms() {
  return http.get(apiEndpoint);
}

export function getRoomById(roomId) {
  return http.get(apiEndpoint + "/" + roomId);
}

export function deleteRoom(roomId) {
  return http.delete(apiEndpoint + "/deleteRoom/" + roomId);
}

export function publishRoom(roomId) {
  return http.put(apiEndpoint + "/publishRoom/" + roomId);
}

export function getRoomsByUser() {
  return http.get(apiEndpoint + "/roomowner/myrooms");
}

export async function saveRoom(data) {
  let image = new FormData();
  let imageCount = 0;
  data.image.forEach((item) => image.append("file", item));
  const { data: imagePath } = await http.post(
    apiEndpoint + "/image/upload",
    image
  );
  imagePath.forEach((item) => {
    data.imagePath[imageCount] = item;
    imageCount++;
  });
  return http.post(apiEndpoint + "/", data);
}

export function updateRoom(
  roomId,
  city,
  location,
  wardNumber,
  // facility,
  monthlyRent,
  squareFeet,
  description
) {
  return http.put(apiEndpoint + "/" + roomId, {
    city,
    location,
    wardNumber,
    // facility,
    monthlyRent,
    squareFeet,
    description,
  });
}

export function roomsCreatedToday() {
  return http.get(apiEndpoint + "/createdToday");
}

export function getOwnerRoomDetail(roomId) {
  return http.get(apiEndpoint + "/" + roomId);
}

export function getTotalRooms() {
  return http.get(apiEndpoint + "/getTotal");
}

const rooms = {
  getRooms,
  getRoomsByUser,
  saveRoom,
  getOwnerRoomDetail,
  getTotalRooms,
  roomsCreatedToday,
  deleteRoom,
  publishRoom,
  updateRoom,
};

export default rooms;
