import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import CategoryModel from "../models/category.js";
import ParentCategoryModel from "../models/categoryModel.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, parentCatId } = req.body;
    const validParentCatId = parentCatId === "" ? null : parentCatId;

    if (validParentCatId && !mongoose.Types.ObjectId.isValid(validParentCatId)) {
      return res.status(400).json({ message: "Invalid parent category ID" });
    }

    if (validParentCatId) {
      const parentCategory = await ParentCategoryModel.findById(validParentCatId);
      if (!parentCategory) {
        return res.status(404).json({ message: "Parent category not found" });
      }
    }

    const newCategory = new CategoryModel({
      name,
      parentCatId: validParentCatId,
    });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ message: "Error creating category", error: err.message });
  }
};

// Get all categories (manual parent lookup)
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    // Manually attach parent category info
    const enrichedCategories = await Promise.all(
      categories.map(async (cat) => {
        let parentCategory = null;
        if (cat.parentCatId) {
          parentCategory = await ParentCategoryModel.findById(cat.parentCatId).select("name image");
        }
        return {
          ...cat.toObject(),
          parentCategory, // will be null or an object
        };
      })
    );

    res.status(200).json(enrichedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single category by ID (manual parent lookup)
export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    let parentCategory = null;
    if (category.parentCatId) {
      parentCategory = await ParentCategoryModel.findById(category.parentCatId).select("name image");
    }

    res.status(200).json({
      ...category.toObject(),
      parentCategory,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a category (no populate)
export const updateCategory = async (req, res) => {
  try {
    const { name, images, parentCatId } = req.body;

    if (parentCatId) {
      const parentCategory = await ParentCategoryModel.findById(parentCatId);
      if (!parentCategory) {
        return res.status(404).json({ message: "Parent category not found" });
      }
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { name, images, parentCatId },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    let parentCategory = null;
    if (updatedCategory.parentCatId) {
      parentCategory = await ParentCategoryModel.findById(updatedCategory.parentCatId).select("name image");
    }

    res.status(200).json({
      ...updatedCategory.toObject(),
      parentCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: error.message });
  }
};

// Upload category image
export const uploadImage = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file received", success: false });
    }

    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found", success: false });
    }

    if (!Array.isArray(category.images)) {
      category.images = [];
    }

    // Optional: delete old image
    if (category.images.length > 0) {
      const oldImage = category.images[0];
      if (oldImage?.public_id) {
        await cloudinary.uploader.destroy(oldImage.public_id);
      }
      category.images = [];
    }

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "categories",
    });

    const newImage = {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    };

    category.images.push(newImage);
    await category.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
      category,
    });
  } catch (error) {
    console.error("❌ Image upload failed:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};
