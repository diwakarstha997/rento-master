module.exports = (path) => {
  return (req, res, next) => {
    req.customPath = "user_assets/room";
    next();
  };
};
