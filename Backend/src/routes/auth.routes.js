const authRouter = require("express").Router();
const { register, login, profile, logout } = require("../controllers/auth.controller.js");


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", profile);
authRouter.post("/logout", logout);

module.exports = authRouter;