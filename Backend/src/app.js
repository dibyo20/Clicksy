const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes.js");
const imageRouter = require("./routes/image.routes.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/image", imageRouter);

module.exports = app;