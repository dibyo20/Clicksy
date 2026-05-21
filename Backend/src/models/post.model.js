const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
    },
    imgurl: {
        type: String,
        required: [true, "imgurl required for creating a post"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "userId required for creating a post"],
    },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;