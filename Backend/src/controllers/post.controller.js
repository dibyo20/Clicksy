const postModel = require("../models/post.model.js");
const likeModel = require("../models/like.model.js");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPost(req, res) {
    try {
        console.log("file:", req.file);
        console.log("user:", req.user);

        const file = await imagekit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), "file"),
            fileName: "Test",
            folder: "Clicksy",
        });

        const post = await postModel.create({
            caption: req.body.caption,
            imgurl: file.url,
            user: req.user.id,
        });

        await post.populate("user", "-password");

        return res.status(201).json({
            message: "Post created successfully",
            post: post,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }

}

async function getUserPosts(req, res) {
    const userId = req.user.id;
    const posts = await postModel.find({ user: userId }).populate("user", "-password");
    const countPosts = posts.length;

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts,
        countPosts: countPosts,
    });
}

async function getPostDetails(req, res) {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await postModel.findOne({ _id: postId, user: userId });

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isValidateUser = post.user.toString() === userId;

    if (!isValidateUser) {
        return res.status(401).json({
            message: "Forbidden access to the post details"
        });
    }

    const likes = await likeModel.find({ post: postId });
    const countLikes = likes.length;

    return res.status(200).json({
        message: "Post details fetched successfully",
        post: post,
        countLikes: countLikes,
    });
}

async function getAllPosts(req, res) {
    const posts = await Promise.all((await postModel.find().populate("user", "-password").sort({ _id: -1 }).lean())
        .map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: req.user.username,
                post: post._id,
            });
            post.isLiked = Boolean(isLiked);
            return post;
        }));

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts,
    });
}

async function likePost(req, res) {
    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isLiked = await likeModel.findOne({ user: username, post: postId });

    if (isLiked) {
        return res.status(400).json({
            message: "You have already liked this post"
        });
    }

    const like = await likeModel.create({
        user: username,
        post: postId,
    });

    return res.status(200).json({
        message: "Post liked successfully",
        like: like,
    });
}

async function unlikePost(req, res) {
    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isLiked = await likeModel.findOne({ user: username, post: postId });

    if (!isLiked) {
        return res.status(400).json({
            message: "You have not liked this post"
        });
    }

    const unlike = await likeModel.findOneAndDelete({
        user: username,
        post: postId,
    });

    return res.status(200).json({
        message: "Post unliked successfully",
        unlike,
    });
}

module.exports = {
    createPost,
    getUserPosts,
    getPostDetails,
    getAllPosts,
    likePost,
    unlikePost,
};