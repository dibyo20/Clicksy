const followModel = require("../models/follow.model.js");
const userModel = require("../models/user.model.js");

async function followUser(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followerUsername === followeeUsername) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const isFollowExists = await userModel.findOne({ username: followeeUsername });
    if (!isFollowExists) {
        return res.status(404).json({ message: "User not found" });
    }

    const isAlreadyFollowing = await followModel.findOne({ follower: followerUsername, followee: followeeUsername });
    if (isAlreadyFollowing) {
        return res.status(400).json({ message: "You are already following this user" });
    }

    const followRecord = await followModel.create({ follower: followerUsername, followee: followeeUsername });

    res.status(201).json({
        message: "User followed successfully",
        followRecord,
    });
}

async function unfollowUser(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followerUsername === followeeUsername) {
        return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const isFollowExists = await userModel.findOne({ username: followeeUsername });
    if (!isFollowExists) {
        return res.status(404).json({ message: "User not found" });
    }

    const isUserFollowing = await followModel.findOne({ follower: followerUsername, followee: followeeUsername });
    if (!isUserFollowing) {
        return res.status(400).json({ message: "You are not following this user" });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `User unfollowed ${followeeUsername} successfully`,
    });
}

async function followStatus(req, res) {
    const user = req.user.username;
    const { status } = req.params;

    const request = await followModel.findOne({
        followee: user,
        status: "pending",
    });
    if (!request) {
        return res.status(404).json({ message: "No pending request found", request });
    }

    const followerUsername = request.follower;
    if (followerUsername === user) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    if (status === "accepted") {
        await followModel.findByIdAndUpdate(request._id, { status: status });

        return res.status(200).json({
            message: `Accepted ${followerUsername}'s request to follow you`,
        })
    }

    if (status === "rejected") {
        await followModel.findByIdAndDelete(request._id);

        return res.status(200).json({
            message: `Rejected ${followerUsername}'s request to follow you`,
        });
    }

    if (status !== "accepted" || status !== "rejected") {
        return res.status(400).json({ message: "Invalid status" });
    }
}

module.exports = {
    followUser,
    unfollowUser,
    followStatus,
}