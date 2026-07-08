const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.routes.js");
const postRouter = require("./routes/post.routes.js");
const userRouter = require("./routes/user.routes.js");

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", 'https://clicksy.dibyo.tech', 'http://clicksy.dibyo.tech', process.env.FRONTEND_URL].filter(Boolean),
    credentials: true
}));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Clicky Backend is running..."
    });
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;