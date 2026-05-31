const authRouter = require("express").Router();
const { registerController, loginController } = require("../controllers/auth.controller.js");

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

module.exports = authRouter;