const upload = require("../middleware/upload");

module.exports = {
  upload: async (req, res) => {
    await upload(req, res);
    let path = [];
    req.files.forEach((item) => path.push(req.customPath + item.filename));
    console.log(path);
    res.send(path);
  },
};
