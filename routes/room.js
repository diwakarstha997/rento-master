const express = require("express");
const Room = require("../controller/room");
const Image = require("../controller/image");
const setImagePath = require("../middleware/imagePath");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateId = require("../middleware/validateObjectId");
const checkUserVerification = require("../middleware/checkUserVerification");

const router = express.Router();

router.get("/", Room.read);
router.get("/getTotal", Room.getTotalRoom);
router.get("/createdToday", Room.roomCreatedToday);
router.get("/:id", Room.findByIdForTenant);
router.get("/roomowner/myrooms", [auth], Room.findByUser);
router.get("/RoomOwner/:id", [auth], Room.findByIdForRoomOwner);
router.get(
  "/RoomOwner/getApplicationsForRoom/:id",
  Room.getApplicationsForRoom
);

router.post(
  "/image/upload",
  [auth, setImagePath("user_assets/room/")],
  Image.upload
);
router.post(
  "/image/optionalUpload/:id",
  [auth, setImagePath("user_assets/room/")],
  Room.optionalUpload
);
router.post("/image/optionalDelete/:id", [auth], Room.optionalDelete);
router.post("/", [auth], Room.insert);

// router.post("/status", [auth], Room.updatePublishStatus);
router.put("/:id", [auth], Room.update);
router.put(
  "/publishRoom/:id",
  [auth, checkUserVerification, validateId],
  Room.publish
);
router.delete("/deleteRoom/:id", [auth, validateId], Room.delete);

module.exports = router;
