import express from "express";
import { createCategory, uploadImage, getCategories,deleteCategory } from "../controllers/categoryController.js";
import upload from "../middleware/multer.js"; // Import Multer middleware

const router = express.Router();

// Create a category (only JSON data, not images)
router.post("/createCategory", createCategory);

// Upload category image separately
router.post("/:id/upload", upload.single("image"), uploadImage);

// Get all categories
router.get("/getCategory", getCategories);
router.delete("/:id", deleteCategory);

export default router;
