const userRouter = require("express").Router();
const { getUserProfile, updateProfile, updateProfilePicture, followUser, unfollowUser, requestedUsers, acceptUser, rejectUser, followers, following, notFollowing } = require("../controllers/user.controller.js");
const { identifyUser } = require("../middlewares/auth.middleware.js");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * GET /api/users/profile
 * Description: Get user profile
 * Protected: Yes
 */
userRouter.get("/profile", identifyUser, getUserProfile);

/**
 * PATCH /api/users/updateprofile
 * Description: Update user profile
 * Protected: Yes
 */
userRouter.patch("/updateprofile", identifyUser, updateProfile);

/**
 * PATCH /api/users/updateprofilepicture
 * Description: Update user profile picture
 * Protected: Yes
 */
userRouter.patch("/updateprofilepicture", identifyUser, upload.single("profileImage"), updateProfilePicture);

/**
 * POST /api/users/follow/:username
 * Description: Follow a user
 * Protected: Yes
 * 
 */
userRouter.post("/follow/:username", identifyUser, followUser);

/**
 * POST /api/users/unfollow/:username
 * Description: Unfollow a user
 * Protected: Yes
 * 
 */
userRouter.post("/unfollow/:username", identifyUser, unfollowUser);

/**
 * POST /api/users/status
 * Description: Check follow status
 * Protected: Yes
 * 
 */
userRouter.get("/requested", identifyUser, requestedUsers);

/**
 * POST /api/users/status/accept/:username
 * Description: Accept follow request
 * Protected: Yes
 * 
 */
userRouter.post("/status/accept/:username", identifyUser, acceptUser);

/**
 * POST /api/users/status/reject/:username
 * Description: Reject follow request
 * Protected: Yes
 * 
 */
userRouter.post("/status/reject/:username", identifyUser, rejectUser);

/**
 * GET /api/users/followers
 * Description: Get followers
 * Protected: Yes
 */
userRouter.get("/followers", identifyUser, followers);

/**
 * GET /api/users/following
 * Description: Get following
 * Protected: Yes
 */
userRouter.get("/following", identifyUser, following);

/**
 * GET /api/users/notfollowing
 * Description: Get users not following
 * Protected: Yes
 */
userRouter.get("/notfollowing", identifyUser, notFollowing);

module.exports = userRouter;