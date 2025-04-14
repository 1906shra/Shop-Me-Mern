// MyAccount.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  FaUser, FaBox, FaHeart, FaSignOutAlt,
  FaCog, FaMapMarkerAlt, FaCreditCard, FaEdit, FaCamera
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import defaultImg from "../../assets/user1.png";
import { AuthContext } from "../../App";

function MyAccount() {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [admin, setadmin] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    avatar: "",
    address: {
      addressLine: "",
      city: "",
      state: "",
      country: "",
      pincode: ""
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch admin data");

      const data = await res.json();
      setadmin({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        gender: data.gender || "",
        avatar: data.avatar?.url || "",
        address: data.address ? {
          addressLine: data.address.addressLine || "",
          city: data.address.city || "",
          state: data.address.state || "",
          country: data.address.country || "",
          pincode: data.address.pincode || "",
        } : {
          addressLine: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setadmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setadmin((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      }
    }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(admin.email)) {
        alert("Please enter a valid email.");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/admin/update-profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            gender: admin.gender,
            address: admin.address,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to update profile");
        }

        alert("Profile updated successfully!");
        await fetchUser();
      } catch (err) {
        console.error("Update failed", err);
        alert(err.message);
      } finally {
        setLoading(false);
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
      const res = await fetch("http://localhost:5000/api/admin/upload-avatar", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Avatar upload failed");
      }

      const data = await res.json();
      setadmin((prev) => ({
        ...prev,
        avatar: `${data.avatar.url}?t=${Date.now()}`,
      }));
    } catch (err) {
      console.error("Upload failed", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/admin/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLogin(false);
    } catch (err) {
      console.warn("Logout failed on backend");
    } finally {
      localStorage.removeItem("token");
      navigate("/");
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
                src={admin.avatar || defaultImg}
                alt="admin Avatar"
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
            {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
            <h2 className="mt-3 text-lg font-semibold">{admin.name}</h2>
            <p className="text-gray-500">{admin.email}</p>
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

        {/* Main Form */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded-md p-5">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-semibold">My Profile</h2>
            <button onClick={toggleEdit} disabled={loading} className="text-blue-500 flex items-center gap-2">
              <FaEdit /> {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Form Fields */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={admin.name}
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
                value={admin.email}
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
                value={admin.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600">Gender:</label>
              <select
                name="gender"
                value={admin.gender}
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
              <label className="text-gray-600">Address Line:</label>
              <input
                type="text"
                name="addressLine"
                value={admin.address.addressLine}
                onChange={handleAddressChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">City:</label>
                <input
                  type="text"
                  name="city"
                  value={admin.address.city}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-gray-600">State:</label>
                <input
                  type="text"
                  name="state"
                  value={admin.address.state}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={admin.address.country}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-gray-600">Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={admin.address.pincode}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
