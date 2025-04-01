import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: null, // ✅ Set default as null instead of an empty string
        },
        mobile: {
            type: String, // ✅ Store as String to preserve leading zeros
            default: null,
        },
        refresh_token: {
            type: String,
            default: "",
        },
        verify_email: {
            type: Boolean,
            default: false,
        },
        last_login_date: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Suspended"],
            default: "Active",
        },
        forgot_password_otp: {
            type: String,
            default: null, // ✅ Change default to null
        },
        forgot_password_expiry: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            enum: ["Admin", "User"],
            default: "User",
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address", // ✅ Ensure it matches your Address model
            default: null,
        },
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CartProduct",
            },
        ],
        orderHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
