const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function registerController(req, res) {
    const { fullname, username, email, password, bio, profileImage } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserExists) {
        return res.status(400).json({
            message: "Username or email already exists",
        });
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        fullname,
        username,
        email,
        password: hashedPassword,
        bio,
        profileImage,
    });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        }
    });
}

/**
   * username
   * password
   *
   * { username:test, email:undefined, password:Test12 } = req.body
   *
   * email
   * password
   *
   * { username:undefined, email:test@test.com, password:Test12 } = req.body
   *
   */
async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    const isPasswordCorrect = hashedPassword === user.password;

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Password is incorrect",
        });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);

    return res.status(200).json({
        message: "Login successful",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        }
    });
}

module.exports = {
    registerController,
    loginController,
};