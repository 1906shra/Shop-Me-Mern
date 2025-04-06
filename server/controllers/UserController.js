import nodemailer from "nodemailer";

import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import transporter from "../config/emailConfig.js";
import cloudinary from "../config/cloudinary.js";


import fs from "fs";
import upload from "../middleware/multer.js";

import crypto from "crypto"; // For OTP generation


export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const sendVerificationEmail = async (user) => {
    try {
        const token = jwt.sign({ id: user._id }, process.env.EMAIL_SECRET, { expiresIn: "1d" });
        const verificationLink = `${process.env.CLIENT_URL}/verify/${token}`;
        
        console.log("Generated Verification Link:", verificationLink);
        
        const emailInfo = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Verify Your Email",
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
        });

        console.log("Email sent successfully:", emailInfo);
        return token; // ✅ Return the token so it can be used in registerUser
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Email sending failed"); // let registerUser handle the error
    }
};

export const registerUser = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            verify_email: false
        });

        console.log("🔥 About to call sendVerificationEmail");

        const token = await sendVerificationEmail(user);
        
        console.log("📨 Token returned from sendVerificationEmail:", token);
        

        return res.status(201).json({
            message: "User registered successfully. Please verify your email.",
            // optiontokally expose the token for debugging or testing
            token
        });
       // const token = await sendVerificationEmail(user); 
    } catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;
      const checkOnly = req.query.check === "true";
  
      const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(400).json({ message: "Invalid token or user not found" });
      }
  
      if (checkOnly) {
        return res.status(200).json({ message: "Token is valid", userVerified: user.verify_email });
      }
  
      if (user.verify_email) {
        return res.status(400).json({ message: "Email already verified" });
      }
  
      user.verify_email = true;
      await user.save();
  
      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({ message: "Verification token expired. Please request a new one." });
      }
      return res.status(500).json({ message: "Invalid or expired token" });
    }
  };

  export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        email = email.toLowerCase(); // Normalize

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!user.verify_email) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

        res.status(200).json({ 
            message: "User logged in successfully", 
            user: { fullname: user.fullname, email: user.email, verify_email: user.verify_email }, 
            token 
        });
    } catch (error) {
        console.error("Login error:", error);
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

export const resendVerificationEmail = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.verify_email) {
        return res.status(400).json({ message: "Email is already verified" });
      }
  
      await sendVerificationEmail(user);
      res.status(200).json({ message: "Verification email resent successfully" });
    } catch (error) {
      console.error("Error resending verification email:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  






  export const userAvatarController = async (req, res) => {
    console.log("Received request for avatar upload.");
  
    if (!req.file) {
      console.log("No file uploaded.");
      return res.status(400).json({ message: "No file uploaded." });
    }
  
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Remove old avatar
      if (user.avatar) {
        const oldImagePublicId = user.avatar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`avatars/${oldImagePublicId}`);
        console.log("Old avatar removed from Cloudinary:", oldImagePublicId);
      }
  
      // Update with new avatar
      console.log("New avatar uploaded to Cloudinary:", req.file.path);
      user.avatar = req.file.path;
      await user.save();
  
      // ✅ THIS IS WHAT MATTERS
      res.status(200).json({
        avatar: user.avatar,
      });
  
    } catch (error) {
      console.log("Error uploading avatar:", error);
      res.status(500).json({ message: "Upload failed", error });
    }
  };
  
  export async function removeImageFromCloudinary(req, res) {
    try {
        const imgUrl = req.query.img;

        if (!imgUrl) {
            return res.status(400).json({ error: "Image URL is required." });
        }

        // Extract image public ID properly
        const imagePath = imgUrl.split("/").slice(-2).join("/"); // Handles folders
        const publicId = imagePath.split(".")[0]; // Remove file extension

        if (!publicId) {
            return res.status(400).json({ error: "Invalid image format." });
        }

        // Delete the image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok") {
            return res.status(400).json({ error: "Image deletion failed." });
        }

        return res.status(200).json({ success: true, message: "Image deleted successfully." });

    } catch (error) {
        console.error("Error removing image:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function updateUserDetails(req, res) {
    try {
        const userId = req.params.id;
        console.log("Received User ID:", userId);

        const userExist = await User.findById(userId);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        const { fullname, email, password, mobile, address, gender } = req.body;
        console.log("Request Body:", req.body);

        if (!fullname && !email && !mobile && !password && !address && !gender) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const updateFields = {};

        // Fullname
        if (fullname) updateFields.fullname = fullname;

        // Mobile, address, gender
        if (mobile) updateFields.mobile = mobile;
        if (address) updateFields.address = address;
        if (gender) updateFields.gender = gender;

        // Password update (only if non-empty)
        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        // Email update (only if different and valid)
        if (email && email !== userExist.email) {
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                return res.status(400).json({ message: "Invalid email format." });
            }

            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use." });
            }

            // Trigger email verification again
            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            updateFields.email = email;
            updateFields.verify_email = false;
            updateFields.forgot_password_otp = verifyCode;
            updateFields.forgot_password_expiry = Date.now() + 10 * 60 * 1000;

            // Send verification email
            await sendVerificationEmail({ ...userExist.toObject(), email, forgot_password_otp: verifyCode });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        if (!updatedUser) {
            return res.status(400).json({ message: "Failed to update user." });
        }

        console.log("Updated user:", updatedUser);

        return res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error updating user:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}




export async function sendOtpController(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
        const expiry = Date.now() + 10 * 60 * 1000;

        user.forgot_password_otp = otp;
        user.forgot_password_expiry = expiry;
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//  Verify OTP
export async function verifyOtpController(req, res) {
    console.log("Received Request Body:", req.body); // Debugging

    let { email, otp } = req.body;
    
    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        email = email.trim().toLowerCase(); // Normalize email case
        otp = otp.toString().trim(); // Ensure OTP is a string and remove extra spaces

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > user.forgot_password_expiry) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // Reset OTP fields after successful verification
        user.forgot_password_otp = null;
        user.forgot_password_expiry = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


//  Reset Password
export async function resetPasswordController(req, res) {
    const { email, newPassword } = req.body;
  
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      console.error("Error resetting password:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }



  export const getCurrentUser = async (req, res) => {
    try {
      const { password, ...user } = req.user._doc; // remove sensitive info
      res.status(200).json(user);
    } catch (err) {
      console.error("Failed to get user profile:", err);
      res.status(500).json({ message: "Failed to retrieve user data." });
    }
  };
  