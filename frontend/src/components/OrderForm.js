import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/form.css";
import formImg from "../assets/formImg.jpg";

function OrderForm() {
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    address: "",
    city: "",
    state: "",
    lorryCategory: "",
    lorryType: "",
    quantity: "",
    additionalFeatures: ""
  });

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    type: "success", // success | error
    message: ""
  });

  // Auto-hide notification after 3s
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/client/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFormData((prev) => ({
            ...prev,
            userId: res.data._id,
            userName: res.data.name || "",
            email: res.data.email || "",
            phoneNumber: res.data.phone || "",
            companyName: res.data.companyName || "",
          }));
        })
        .catch((err) => console.error("Error fetching user profile:", err));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/lorryCategories/products")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (formData.lorryCategory) {
      axios
        .get(`http://localhost:5000/lorryType/category/${formData.lorryCategory}`)
        .then((res) => {
          setTypes(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      setTypes([]);
    }
  }, [formData.lorryCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "lorryCategory" && { lorryType: "" })
    });
  };

  const sendData = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/orders/submit", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNotification({
          show: true,
          type: "success",
          message: res.data.message || "Order submitted successfully!",
        });

        setFormData({
          userId: formData.userId,
          userName: formData.userName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          companyName: formData.companyName,
          address: "",
          city: "",
          state: "",
          lorryCategory: "",
          lorryType: "",
          quantity: "",
          additionalFeatures: "",
        });
        setTypes([]);
      })
      .catch((err) => {
        setNotification({
          show: true,
          type: "error",
          message: err.response?.data?.message || "Something went wrong!",
        });
      });
  };


  return (
    <>
    <div className="Request-container">
      <div className="row">
        <div className="info">
          <img src={formImg} alt="Lorry" className="form-side-image" />
        </div>

        <div className="request-form">
          <h2>Order</h2>
          <form onSubmit={sendData}>
            <div className="form-group">
              <input name="userName" placeholder="Name" value={formData.userName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            </div>

            {/* Category Dropdown */}
            <div className="form-group">
              <select name="lorryCategory" value={formData.lorryCategory} onChange={handleChange}>
                <option value="">Select lorry category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Dropdown */}
            <div className="form-group">
            <select name="lorryType" value={formData.lorryType} onChange={handleChange} disabled={!formData.lorryCategory}>
                <option value="">Select lorry type</option>
                    {types.map((type) => (
                <option key={type._id} value={type._id}>
                    {type.typeName}
                </option>
                    ))}
            </select>

            </div>
            <div className="form-group">
              <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
            </div>

            <div className="form-group">
              <textarea
                name="additionalFeatures"
                placeholder="Describe additional features"
                value={formData.additionalFeatures}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>

   {/* Notification UI */}
      {notification.show && (
        <div
          className={`notification ${notification.type}`}
          role="alert"
          aria-live="assertive"
        >
          <div className="notification__icon"></div>
          <div className="notification__body">
            <h2 className="notification__header">
              {notification.type === "success" ? "Success" : "Error"}
            </h2>
            <p className="notification__text">{notification.message}</p>
          </div>
          <div className="notification__action">
            <button
              className="notification_button"
              aria-label="dismiss"
              onClick={() => setNotification({ ...notification, show: false })}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderForm;