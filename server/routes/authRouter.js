import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js"; // Import the multer configuration
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  userAvatarController,
  removeImageFromCloudinary
} from "../controllers/UserController.js";

const router = express.Router();

// User registration and authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify/:token", verifyEmail);

// Avatar upload route (uses multer for file handling)
router.put("/user-avatar", authenticate, upload.single("avatar"), userAvatarController);

// Remove image from Cloudinary route
router.delete("/remove-image", authenticate, removeImageFromCloudinary);



export default router;
