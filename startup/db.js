const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL

module.exports = function () {
  try {
    const connect = mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    if(connect) console.log("Db connection success");
    
  } catch (error) {
    console.log("Db connection failed");
  }
};
