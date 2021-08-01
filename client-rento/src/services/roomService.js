import http from "./httpService";

const apiEndpoint = "/room";

export function getRooms() {
  return http.get(apiEndpoint);
}

export function getRoomById(roomId) {
  return http.get(apiEndpoint + "/" + roomId);
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

export function roomsCreatedToday() {
  return http.get(apiEndpoint + "/createdToday");
}

export function getOwnerRoomDetail(roomId) {
  return http.get(apiEndpoint + "/roomOwner/" + roomId);
}

export function getTotalRooms() {
  return http.get(apiEndpoint + "/getTotal");
}

const rooms = {
  getRooms,
  getRoomsByUser,
  saveRoom,
  getTotalRooms,
  roomsCreatedToday,
};

export default rooms;
