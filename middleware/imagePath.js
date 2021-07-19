module.exports = (path) => {
  return (req, res, next) => {
    req.customPath = path;
    next();
  };
};
