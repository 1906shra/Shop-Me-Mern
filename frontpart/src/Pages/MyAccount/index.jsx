import React, { useState } from "react";
import { FaUser, FaBox, FaHeart, FaSignOutAlt, FaCog, FaMapMarkerAlt, FaCreditCard, FaEdit } from "react-icons/fa";
import img from "../../assets/user1.png";
import { Link } from "react-router-dom";

function MyAccount() {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    gender: "Male",
    address: "123, Street Name, City, State - 110001"
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="py-10 w-full flex justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-md p-5">
          <div className="flex flex-col items-center border-b pb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img src={img} alt="User" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-3 text-lg font-semibold">{userInfo.name}</h2>
            <p className="text-gray-500">{userInfo.email}</p>
          </div>
          <nav className="mt-4">
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaUser /> My Profile
              </li>
              <Link to = '/Order'>
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaBox /> My Orders
              </li>
              </Link>
              <Link to = "/wishList">
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaHeart /> Wishlist
              </li>
              </Link>
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaMapMarkerAlt /> Saved Addresses
              </li>
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaCreditCard /> Payment Methods
              </li>
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaCog /> Settings
              </li>
              <li className="flex items-center gap-3 p-3 text-red-500 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded-md p-5">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-semibold">My Profile</h2>
            <button onClick={toggleEdit} className="text-blue-500 flex items-center gap-2">
              <FaEdit /> {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600">Phone:</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600">Gender:</label>
              <select
                name="gender"
                value={userInfo.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-gray-600">Address:</label>
              <textarea
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
