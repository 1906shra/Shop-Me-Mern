import React, { useState, useEffect } from "react";
import {
  FaUser, FaBox, FaHeart, FaSignOutAlt,
  FaCog, FaMapMarkerAlt, FaCreditCard, FaEdit, FaCamera
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultImg from "../../assets/user1.png";
import { useNavigate } from "react-router-dom";


function MyAccount() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setUserId(data._id);
        setUserInfo({
          name: data.fullname,
          email: data.email,
          phone: data.mobile || "",
          gender: data.gender || "",
          address: data.address || "",
          avatar: data.avatar || "",
        });
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const toggleEdit = async () => {
    if (isEditing) {
      // Save logic
      try {
        await axios.patch(
          `http://localhost:5000/api/user/update/${userId}`,
          {
            fullname: userInfo.name,
            email: userInfo.email,
            mobile: userInfo.phone,
            address: userInfo.address,
            gender: userInfo.gender,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Profile updated successfully!");
      } catch (err) {
        console.error("Update failed", err);
        alert("Failed to update profile.");
      }
    }

    setIsEditing(!isEditing);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:5000/api/user/user-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserInfo((prev) => ({
        ...prev,
        avatar: `${res.data.avatar}?t=${Date.now()}`,
      }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("Avatar upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.warn("Logout failed on backend");
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  

  return (
    <section className="py-10 w-full flex justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-md p-5">
          <div className="flex flex-col items-center border-b pb-4 relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden relative group">
              <img
                src={userInfo.avatar || defaultImg}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow group-hover:opacity-100 opacity-0 transition-opacity">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            {loading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            <h2 className="mt-3 text-lg font-semibold">{userInfo.name}</h2>
            <p className="text-gray-500">{userInfo.email}</p>
          </div>

          <nav className="mt-4">
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaUser /> My Profile
              </li>
              <Link to="/Order">
                <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FaBox /> My Orders
                </li>
              </Link>
              <Link to="/wishList">
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
              <li
  onClick={handleLogout}
  className="flex items-center gap-3 p-3 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
>
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
                <option value="">Select</option>
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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
