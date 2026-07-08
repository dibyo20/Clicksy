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
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://clicksy.dibyo.tech",
    "http://clicksy.dibyo.tech",
    ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(url => url.trim()) : [])
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy restriction: origin ${origin} not allowed`));
        }
    },
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