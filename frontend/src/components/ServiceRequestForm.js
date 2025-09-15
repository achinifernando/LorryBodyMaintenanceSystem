import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/form.css"; 
import formImg2 from '../assets/formImg2.jpg';

function RepairMaintenanceForm() {
  const [formData, setFormData] = useState({
    userId: "", //  replace with actual logged-in user ID
    userName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    address: "",
    city: "",
    state: "",
    lorryModel: "",
    lorryNumber: "",
    serviceType: "",
    issueDescription: "",
    preferredDate: ""
  });

  const [services, setServices] = useState([]);
  const [image, setImage] = useState(null); // <-- store image file

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

  
   //  Fetch logged-in user details from backend
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

  // Fetch available services
  useEffect(() => {
    axios.get("http://localhost:5000/service/getServices")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // store selected image file
  };

  const sendData = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")

    const data = new FormData();
    // Append text fields
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    // Append image
    if (image) {
      data.append("image", image);
    }

    axios.post("http://localhost:5000/serviceRequest/submit", data, {
      headers: { "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
       }
    })
      .then((res) => {
        setNotification({
          show: true,
          type: "success",
          message: res.data.message || "Service request submitted successfully!",
        });


      setFormData({
        userId: formData.userId,
        userName: formData.userName,
        phoneNumber:formData.phoneNumber,
        email: formData.email,
        companyName:formData.companyName,
        address: "",
        city: "",
        lorryModel: "",
        lorryNumber: "",
        serviceType: "",
        issueDescription: "",
        preferredDate: ""
      });
      setImage(null);
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
          <img src={formImg2} alt="Lorry" className="form-side-image" />
        </div>

        <div className="request-form">
          <h2>Request Repair/Maintenance</h2>
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

            <div className="form-group">
              <input name="lorryModel" placeholder="Lorry Model" value={formData.lorryModel} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="lorryNumber" placeholder="Lorry Number" value={formData.lorryNumber} onChange={handleChange} />
            </div>

            <div className="form-group">
              <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
                <option value="">Select Service Type</option>
                {services.map((service) => (
                  <option key={service._id} value={service.serviceType}>
                    {service.serviceType}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <textarea name="issueDescription" placeholder="Describe the issue" value={formData.issueDescription} onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
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
export default RepairMaintenanceForm;
