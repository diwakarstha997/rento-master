module.exports = function (err, req, res, next) {
  console.log("error", err.message);
  if (err.status === 500) res.status(500).send("something went wrong");
};
