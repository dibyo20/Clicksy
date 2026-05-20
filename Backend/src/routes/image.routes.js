const imageRouter = require("express").Router();
const { uploadImage, upload } = require("../controllers/image.controller.js");

imageRouter.post("/upload", upload.single("image"), uploadImage);

module.exports = imageRouter;