const authRouter = require("express").Router();
const { registerController, loginController, logoutController, getUserController } = require("../controllers/auth.controller.js");

/**
 * POST /api/auth/register
 * Description: Register a new user
 * Protected: No
 * 
 */
authRouter.post("/register", registerController);

/**
 * POST /api/auth/login
 * Description: Login a user
 * Protected: No
 * 
 */
authRouter.post("/login", loginController);

/**
 * POST /api/auth/logout
 * Description: Logout an user
 * Protected: Yes
 * 
 */
authRouter.post("/logout", logoutController);

module.exports = authRouter;