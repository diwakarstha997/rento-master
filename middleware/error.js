module.exports = function (err, req, res, next) {
  if (err.status === 500) res.status(500).send("something went wrong");
};
