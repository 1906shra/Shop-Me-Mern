import CartProduct from "../models/CartProductModel.js";
import User from "../models/Users.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    const user_id = req.user._id;

    // Check if cart item already exists
    let cartItem = await CartProduct.findOne({ product_id, user_id });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartProduct.create({ product_id, quantity, user_id });
    }

    // Add cart item ID to user's cart array if not already present
    const user = await User.findById(user_id);

    const alreadyInCart = user.cart.some(
      (itemId) => itemId.toString() === cartItem._id.toString()
    );

    if (!alreadyInCart) {
      user.cart.push(cartItem._id);
      await user.save();
    }

    return res.status(200).json({
      message: "Cart updated successfully",
      cartItem,
      userCart: user.cart,
    });

  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all cart items for a user
export const getUserCart = async (req, res) => {
  try {
    const user_id = req.user._id;

    const cartItems = await CartProduct.find({ user_id }).populate("product_id");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a single cart item by ID
export const getSingleCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;

    const cartItem = await CartProduct.findOne({ _id: id, user_id }).populate("product_id");

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update quantity of a cart item
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // cart item ID
    const { quantity } = req.body;

    const updatedItem = await CartProduct.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await CartProduct.findByIdAndDelete(id);

    // Optionally remove the ID from the user's cart array too
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { cart: id },
    });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
