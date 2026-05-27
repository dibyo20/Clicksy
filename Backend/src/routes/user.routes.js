const userRouter = require("express").Router();
const { followUser, unfollowUser, followStatus, acceptUser, rejectUser } = require("../controllers/user.controller.js");
const { identifyUser } = require("../middlewares/auth.middleware.js");

userRouter.post("/follow/:username", identifyUser, followUser);
userRouter.post("/status", identifyUser, followStatus);
userRouter.post("/status/accept/:username", identifyUser, acceptUser);
userRouter.post("/status/reject/:username", identifyUser, rejectUser);
userRouter.post("/unfollow/:username", identifyUser, unfollowUser);

module.exports = userRouter;