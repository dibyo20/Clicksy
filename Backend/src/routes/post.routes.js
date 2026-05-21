const postRouter = require("express").Router();
const { createPost, getPosts, getPostDetails } = require("../controllers/post.controller.js");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), createPost);
postRouter.get("/", getPosts);
postRouter.get("/:id", getPostDetails);

module.exports = postRouter;