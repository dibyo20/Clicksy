const postRouter = require("express").Router();
const { createPost, getPosts, getPostDetails, likePost } = require("../controllers/post.controller.js");
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
postRouter.get("/", identifyUser, getPosts);

/**
 * GET /api/posts/details/:id [protected]
 * - req.params = { id }
 * - return a detail about a post with id & also check if the post belongs to the user or not
 */
postRouter.get("/:id", identifyUser, getPostDetails);

/**
 * POST /api/posts/like/:postId [protected]
 * - req.params = { postId }
 * - req.user = { username }
 */
postRouter.post("/like/:postId", identifyUser, likePost);

module.exports = postRouter;