const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    caption: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

const imageModel = mongoose.model("images", imageSchema);

module.exports = imageModel;