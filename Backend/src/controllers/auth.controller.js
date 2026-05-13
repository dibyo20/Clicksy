const authModel = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    const isUserExists = await authModel.findOne({ email: email });

    if (isUserExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await crypto.createHash("md5").update(password).digest("hex");

    const newUser = await authModel.create({
        username,
        email,
        password: hashedPassword,
    });

    return res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const user = await authModel.findOne({ email: email });

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    const hashedPassword = await crypto.createHash("md5").update(password).digest("hex");

    if (hashedPassword !== user.password) {
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "10s" });
    res.cookie("token", token);

    return res.status(200).json({
        message: "Login Successful",
        data: {
            username: user.username,
            email: user.email
        }
    });
}

async function profile(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
        message: "User Profile",
        data: {
            username: decoded.username,
        }
    });
}

async function logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout Successful"
    });
}

module.exports = {
    register,
    login,
    profile,
    logout,
};