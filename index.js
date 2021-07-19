require("express-async-errors");
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const facility = require("./routes/facility");
const city = require("./routes/city");
const user = require("./routes/user");
const room = require("./routes/room");
// const image = require("./routes/image");
const application = require("./routes/application");
const error = require("./middleware/error");

const app = express();

app.use(cors());

require("./startup/db")();

//middlewares
app.use(express.json());
app.use("/api/city", city);
app.use("/api/facility", facility);
app.use("/api/auth", auth);
// app.use("/api/image", image);
app.use("/api/user", user);
app.use("/api/room", room);
app.use("/api/application", application);

//error handler middleware
app.use(error);

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`listening to port: ${port}`));
