const followModel = require("../models/follow.model.js");
const userModel = require("../models/user.model.js");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function getUserProfile(req, res) {
    const user = await userModel.findOne({ username: req.user.username });
    res.status(200).json({ user });
}

async function updateProfile(req, res) {
    const { fullname, bio } = req.body;
    await userModel.findOneAndUpdate({ username: req.user.username }, { fullname: fullname, bio: bio });

    const user = await userModel.findOne({ username: req.user.username });
    res.status(200).json({
        user: user
    });
}

async function updateProfilePicture(req, res) {
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "Clicksy",
    });

    await userModel.findOneAndUpdate({ username: req.user.username }, { profileImage: file.url });

    const user = await userModel.findOne({ username: req.user.username });
    res.status(200).json({ user });
}

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

async function requestedUsers(req, res) {
    const user = req.user.username;

    const request = await followModel.find({
        followee: user,
        status: "pending",
    });

    return res.status(200).json({ pendingRequests: request });
}

async function acceptUser(req, res) {
    const user = req.user.username;
    const follower = req.params.username;

    const request = await followModel.findOne({ follower: follower, followee: user, status: "pending" });
    if (!request) {
        return res.status(404).json({ message: "No pending request found" });
    }

    await followModel.findByIdAndUpdate(request._id, { status: "accepted" });

    return res.status(200).json({
        message: `Accepted ${follower}'s request to follow you`,
    });
}

async function rejectUser(req, res) {
    const user = req.user.username;
    const follower = req.params.username;

    const request = await followModel.findOne({ follower: follower, followee: user });
    if (!request) {
        return res.status(404).json({ message: "No pending request found" });
    }

    await followModel.findByIdAndDelete(request._id);

    return res.status(200).json({
        message: `Rejected ${follower}'s request to follow you`,
    });
}

async function followers(req, res) {
    const user = req.user.username;
    const followRecords = await followModel.find({ followee: user, status: "accepted" });
    const followerUsernames = followRecords.map(f => f.follower);
    const followers = await userModel.find({ username: { $in: followerUsernames } }).select("-password");
    const countFollowers = followers.length;
    return res.status(200).json({
        followers,
        countFollowers,
        followerUsernames,
        followRecords,
    });
}

async function following(req, res) {
    const user = req.user.username;
    const followRecords = await followModel.find({ follower: user, status: "accepted" });
    const followingUsernames = followRecords.map(f => f.followee);
    const following = await userModel.find({ username: { $in: followingUsernames } }).select("-password");
    const countFollowing = following.length;
    return res.status(200).json({
        following,
        countFollowing,
        followingUsernames,
        followRecords,
    });
}

async function notFollowing(req, res) {
    try {
        const user = req.user.username;
        const following = await followModel.find({ follower: user, status: { $in: ["accepted", "pending"] } });
        const followingUsers = following.map((follow) => follow.followee);

        followingUsers.push(user);

        const notFollowing = await userModel.find({ username: { $nin: followingUsers } });

        return res.status(200).json({ users: notFollowing });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUserProfile,
    updateProfile,
    updateProfilePicture,
    followUser,
    unfollowUser,
    requestedUsers,
    acceptUser,
    rejectUser,
    followers,
    following,
    notFollowing,
};