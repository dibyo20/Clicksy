const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes.js");
const postRouter = require("./routes/post.routes.js");
const userRouter = require("./routes/user.routes.js");

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter); 
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter); 

module.exports = app;