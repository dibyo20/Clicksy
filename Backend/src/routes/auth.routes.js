const authRouter = require("express").Router();
const { registerController, loginController } = require("../controllers/auth.controller.js");

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

module.exports = authRouter;