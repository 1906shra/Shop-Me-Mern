import mongoose from "mongoose";
 // Assuming you have a parent category model
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        images: [
            {
                type: String, // Assuming URLs or file paths for images
                trim: true,
            }
        ],
        parentCatName: {
            type: String,
            trim: true,
        },
        parentCatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ParentCategory", // Reference to the same schema for parent categories
        },
    },
    { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
