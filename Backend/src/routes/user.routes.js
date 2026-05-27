const userRouter = require("express").Router();
const { followUser, unfollowUser } = require("../controllers/user.controller.js");
const { identifyUser } = require("../middlewares/auth.middleware.js");

userRouter.post("/follow/:username", identifyUser, followUser);
userRouter.post("/unfollow/:username", identifyUser, unfollowUser);

module.exports = userRouter;