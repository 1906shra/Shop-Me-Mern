import mongoose from "mongoose";

const parentCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        images: [
            {
                type: String,
                trim: true,
            }
        ],
    },
    { timestamps: true }
);

const ParentCategoryModel = mongoose.model("ParentCategory", parentCategorySchema);
export default ParentCategoryModel;
