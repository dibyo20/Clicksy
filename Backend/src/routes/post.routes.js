const postRouter = require("express").Router();
const { createPost, getUserPosts, getPostDetails, getAllPosts, likePost, unlikePost } = require("../controllers/post.controller.js");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { identifyUser } = require("../middlewares/auth.middleware.js");

/**
 * POST /api/posts/ [protected]
 * - req.body = { caption, image-file }
 */
postRouter.post("/", identifyUser, upload.single("image"), createPost);

/**
 * GET /api/posts/ [protected]
 */
postRouter.get("/", identifyUser, getUserPosts);

/**
 * GET /api/posts/details/:id [protected]
 * - req.params = { id }
 * - return a detail about a post with id & also check if the post belongs to the user or not
 */
postRouter.get("/details/:id", identifyUser, getPostDetails);

/**
 * GET /api/posts/feed [protected]
 */
postRouter.get("/feed", identifyUser, getAllPosts);

/**
 * POST /api/posts/like/:postId [protected]
 * - req.params = { postId }
 * - req.user = { username }
 */
postRouter.post("/like/:postId", identifyUser, likePost);

/**
 * POST /api/posts/unlike/:postId [protected]
 * - req.params = { postId }
 * - req.user = { username }
 */
postRouter.post("/unlike/:postId", identifyUser, unlikePost);

module.exports = postRouter;