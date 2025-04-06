import cloudinary from "../config/cloudinary.js"; // Import Cloudinary correctly
import multer from "../middleware/multer.js"; // Import multer middleware
import CategoryModel from "../models/categoryModel.js"; // Import Category model
import ParentCategoryModel from "../models/category.js"; // Import ParentCategory model

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name, images, parentCatId } = req.body;
        const parentCategory = parentCatId ? await ParentCategoryModel.findById(parentCatId) : null;

        const category = new CategoryModel({
            name,
            images: images || [],
            parentCatName: parentCategory ? parentCategory.name : null,
            parentCatId,
        });

        await category.save();
        res.status(201).json(await category.populate("parentCatId"));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().populate("parentCatId");
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id).populate("parentCatId");
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { name, images, parentCatId } = req.body;
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            { name, images, parentCatId },
            { new: true }
        ).populate("parentCatId");

        if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(updatedCategory);
    } catch (error) {
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
        res.status(500).json({ error: error.message });
    }
};

// Upload image for category using Cloudinary
export const uploadImage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "category_images",
        });

        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Ensure images array exists
        category.images = category.images || [];
        category.images.push(result.secure_url);
        await category.save();

        res.status(200).json({ message: "Image uploaded successfully", category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



