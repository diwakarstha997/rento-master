const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect("mongodb://localhost/rento_backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
