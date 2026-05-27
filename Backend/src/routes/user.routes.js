const userRouter = require("express").Router();
const { followUser, unfollowUser, followStatus } = require("../controllers/user.controller.js");
const { identifyUser } = require("../middlewares/auth.middleware.js");

userRouter.post("/follow/:username", identifyUser, followUser);
userRouter.post("/unfollow/:username", identifyUser, unfollowUser);
userRouter.post("/status/:status", identifyUser, followStatus);

module.exports = userRouter;