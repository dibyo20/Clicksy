const imageModel = require("../models/image.model.js");
const ImageKit = require("@imagekit/nodejs");
const multer = require("multer");
const { toFile } = require("@imagekit/nodejs");

const upload = multer({ storage: multer.memoryStorage() });

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadImage(req, res) {
    const { caption } = req.body;

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "TextFile",
    });

    const post = await imageModel.create({
        caption: caption,
        imageUrl: file.url,
    });

    res.status(201).json({
        message: "Image uploaded successfully",
        data: post,
    });

}

module.exports = {
    uploadImage,
    upload,
};