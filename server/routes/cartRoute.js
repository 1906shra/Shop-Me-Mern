import express from "express";
import {
    addToCart,
    getUserCart,
    updateCartItem,
    removeCartItem
} from "../controllers/cartController.js";

import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);


router.post("/add", authenticate,addToCart);

router.get("/get", authenticate,getUserCart);

router.put("/update/:id", authenticate,updateCartItem);


router.delete("/delete/:id",authenticate, removeCartItem);

export default router;
