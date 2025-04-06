// controllers/productController.js
import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            productSize,
            productWeight,
            discount,
            ratings,
            stock,
            images,
            location
        } = req.body;

        if (!name || !description || !price || !category || !stock || !images || images.length === 0) {
            return res.status(400).json({ message: "Required fields are missing." });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            subCategory,
            productSize,
            productWeight,
            discount,
            ratings,
            stock,
            images,
            location
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("category");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upload product image
export const uploadProductImage = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "product_images",
        });

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (!Array.isArray(product.images)) {
            product.images = [];
        }

        product.images.push(result.secure_url);
        await product.save();

        res.status(200).json({
            message: "Image uploaded successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.find({ category: categoryId }).populate("category");

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found for this category" });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get filtered products
export const getFilteredProducts = async (req, res) => {
    try {
        const filter = {};

        if (req.query.category) filter.category = req.query.category;
        if (req.query.subCategory) filter.subCategory = req.query.subCategory;
        if (req.query.location) filter["location.label"] = req.query.location;

        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
        }

        const products = await Product.find(filter).populate("category");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
