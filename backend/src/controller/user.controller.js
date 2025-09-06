const userModel = require('../models/user.model.js');
const {generateToken}  = require("../lib/utils.js");
const bcrypt = require('bcrypt');

exports.chakAuth = async (req,res)=>{
    try {
        res.status(200).json(req.user); // req.user is full user object from DB
    } catch (error) {
        console.error("chakAuth error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.signup = async (req,res) => {
    const { fullName, email, password, city,role } = req.body;
    try {
        if(!fullName || !email || !password || !city || !role) return res.status(400).json({message: "All fileds are required "});
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
        const existingUser = await userModel.getUserByEmail(email);
        if(existingUser) return res.status(409).json({ message: "User already exists" });

        const hashedPassword  = await bcrypt.hash(password, 10);

        const userId = await userModel.createUser({ fullName, email, password:hashedPassword, city, role });
        console.log("New User Created ID:", userId);
        generateToken(userId,res);
        
        return res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        console.error("Signup error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.login = async (req,res )=>{
    const {email,password} = req.body;
    try {
        if(!email || !password) return res.status(400).json({message: "All fileds are required "});
        const user = await userModel.getUserByEmail(email);
        if(!user) return res.status(401).json({ message: "Invalid email" });

        const match = await bcrypt.compare(password, user.password);
        if(match === false) return res.status(401).json({ message: "Invalid password" });
        
        generateToken(user.id, res);

        return res.status(200).json({ message: "Login successful", userId: user.id });
    } catch (error) {
        console.error("login error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.logout = async (req,res) => {
    try {
        // Clear the JWT cookie by setting it to empty with maxAge 0
        res.cookie("jwt", "", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 0,
    });

    res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("logout error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};