
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import transporter from "../config/emailConfig.js";
import cloudinary from "../config/cloudinary.js";

import fs from "fs";
import upload from "../middleware/multer.js";
import { error } from "console";


export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const sendVerificationEmail = async (user) => {
    try {
        const token = jwt.sign({ id: user._id }, process.env.EMAIL_SECRET, { expiresIn: "1d" });
        const verificationLink = `http://localhost:${process.env.PORT}/api/auth/verify/${token}`;

        console.log("Generated Verification Link:", verificationLink);

        const emailInfo = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Verify Your Email",
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
        });

        console.log("Email sent successfully:", emailInfo);
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};

export const registerUser = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            console.log("Missing required fields");
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists with this email:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Password hashed successfully");

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            verify_email: false
        });

        console.log("User created successfully:", user);
       const token =  await sendVerificationEmail(user);

        res.status(201).json({ message: "User registered successfully. Please verify your email." ,
              tokens:token
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        console.log("verifyEmail function called with token:", req.params.token);
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
        console.log(" Token decoded:", decoded);

        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("Invalid token or user not found");
            return res.status(400).json({ message: "Invalid token or user not found" });
        }

        console.log(" User found before verification:", user);
        user.verify_email = true;
        await user.save();
        console.log(" User email verified successfully:", user);

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error(" Error verifying email:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Verification token expired. Please request a new one." });
        }
        res.status(500).json({ message: "Invalid or expired token" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!user.verify_email) {
            console.log(" Email not verified for user:", email);
            return res.status(400).json({ message: "Please verify your email before logging in." });
        }

        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

        res.status(200).json({ 
            message: "User logged in successfully", 
            user: { fullname: user.fullname, email: user.email, verify_email: user.verify_email }, 
            token 
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed", error: error.message });
    }
};



var img = []








export const userAvatarController = async (req, res) => {
    console.log("Received request for avatar upload.");

  if (!req.file) {
    console.log("No file uploaded.");
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const userId = req.user.id; // Get user ID from authentication middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 1: Remove old avatar if it exists
    if (user.avatar) {
      const oldImagePublicId = user.avatar.split("/").pop().split(".")[0]; // Extract public_id from URL
      await cloudinary.uploader.destroy(`avatars/${oldImagePublicId}`); // Remove from Cloudinary
      console.log("Old avatar removed from Cloudinary:", oldImagePublicId);
    }

    //Step 2: Save new avatar URL in the database
    console.log("New avatar uploaded to Cloudinary:", req.file.path);

    user.avatar = req.file.path; // Update user's avatar field
    await user.save();

    res.status(200).json({
      message: "Avatar updated successfully",
      imageUrl: user.avatar,
      user,
    });

  } catch (error) {
    console.log("Error uploading avatar:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
  };

  export async function removeImageFromCloudinary(req, res) {
    try {
        // Get image URL from query params
        const imgUrl = req.query.img;

        // Validate if image URL exists
        if (!imgUrl) {
            return res.status(400).json({ error: "Image URL is required." });
        }

        // Extract image name from URL
        const urlArr = imgUrl.split("/");
        const img = urlArr[urlArr.length - 1]; // Get last part of the URL
        const imageName = img.split(".")[0]; // Remove file extension

        // Validate if imageName is extracted properly
        if (!imageName) {
            return res.status(400).json({ error: "Invalid image format." });
        }

        // Remove image from Cloudinary
        const result = await cloudinary.uploader.destroy(imageName);

        // Return response
        return res.status(200).json({ success: true, result });

    } catch (error) {
        console.error("Error removing image:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}