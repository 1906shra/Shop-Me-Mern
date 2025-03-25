import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 7845,
      company: "Product Company",
      name: "Product Name and Description",
      image:
        "https://api.spicezgold.com/download/file_1734774941574_e6mcHGzb_51e00e276f0744eebaf91c9a7b2b15aa.jpg",
      oldPrice: 9999,
      newPrice: 7499,
      discount: 25,
      quantity: 1,
      color: "Red",
      size: "M",
      expectedDelivery: "March 12, 2025"
    },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemoveClick = (item) => {
    setItemToRemove(item);
    setShowPopup(true);
  };

  const confirmRemove = () => {
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
    setShowPopup(false);
    setItemToRemove(null);
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalOriginalPrice = cartItems.reduce((acc, item) => acc + item.oldPrice * item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + (item.oldPrice - item.newPrice) * item.quantity, 0);
  const totalAmount = totalOriginalPrice - totalDiscount;

  return (
    <section className="py-5 bg-gray-100">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[70%] bg-white shadow-md rounded-md p-5">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <p className="mt-1 text-gray-600">
            There are <span className="font-bold text-red-500">{cartItems.length}</span> products in your cart.
          </p>
          <div className="mt-5 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cartItem flex items-center gap-4 p-4 border rounded-md">
                  <div className="w-24 h-24 overflow-hidden rounded-md">
                    <Link to={`/product/${item.id}`} className="group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 w-[90%]">
                    <h3 className="text-lg font-semibold mt-1">
                      <Link to={`/product/${item.id}`} className="text-blue-500 hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <ul className="mt-2 text-gray-700 text-sm space-y-1">
                      <li><strong>Company:</strong> {item.company}</li>
                      <li><strong>Color:</strong> {item.color}</li>
                      <li><strong>Size:</strong> {item.size}</li>
                      <li><strong>Expected Delivery:</strong> {item.expectedDelivery}</li>
                    </ul>
                    <p className="mt-2 text-lg">
                      <span className="line-through text-gray-500 text-sm">₹{item.oldPrice}</span>
                      <span className="text-red-600 font-bold text-xl ml-2">₹{item.newPrice}</span>
                      <span className="text-green-600 font-medium text-lg ml-2">You save {item.discount}%!</span>
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 bg-gray-300 text-black rounded-l-md"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-white border text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 bg-gray-300 text-black rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleRemoveClick(item)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 mt-4">Your cart is empty.</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-[30%] bg-white shadow-md rounded-md p-5">
          <h3 className="text-xl font-semibold mb-4">Price Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Original Price</span>
              <span>₹{totalOriginalPrice}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span className="font-medium">Discount</span>
              <span>-₹{totalDiscount}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Delivery Charges</span>
              <span className="text-green-500">Free</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-3 flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
          <p className="text-green-500 mt-1 text-sm">You will save ₹{totalDiscount} on this order</p>
          <Link to='/checkout'>
            <button className="w-full mt-4 bg-red-500 text-white py-2 rounded-md text-lg hover:bg-red-600">Checkout</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
