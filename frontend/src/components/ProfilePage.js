import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/profile.css";
import { Link } from "react-router-dom";
import profilepic from "../assets/profilepic.jpg";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [quotations, setQuotations] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch user profile
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    if (token) {
      axios
        .get("http://localhost:5000/client/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => console.error("Profile fetch error:", err));
    }
  }, [token]);

  // Fetch orders
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Orders fetch error:", err));
    }
  }, [token]);

  // Fetch service requests
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/serviceRequest/my_services", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setServices(res.data))
        .catch((err) => console.error("Service fetch error:", err));
    }
  }, [token]);

  // Fetch quotation requests
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/quotationRequest/my-quotationRequest", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setQuotations(res.data))
        .catch((err) => console.error("Quotation fetch error:", err));
    }
  }, [token]);

  return (
    <div className="profile-container">
      <div className="profile-row">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-header">
            <h3>Profile Settings</h3>
          </div>
          <div className="profile-card">
            {/* Photo */}
            <div className="photo-upload-container">
              <img
                src={
                  user.profileImageUrl
                    ? `http://localhost:5000/files/${user.profileImageUrl}`
                    : profilepic
                }
                alt="Profile"
                className="photo-img"
              />
            </div>

            {/* Main Section */}
            <div className="profile-main">
              <span className="profile-name">{user.name}</span>
              <br />
              <span className="profile-email">{user.email}</span>
              <br />
              <span className="profile-email">{user.companyName}</span>
              <Link to={`/updateProfileForm/${user._id}`}>
                <button className="btn-save">Update Profile</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="tab-block">
          <ul className="tab-menu">
            {["orders", "requests", "payments", "quotations"].map((tab) => (
              <li
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {/* Orders */}
            {activeTab === "orders" && (
              <div className="tab-pane active">
                <h3>My Orders</h3>
                {orders.length === 0 ? (
                  <p>No orders yet.</p>
                ) : (
                  <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Lorry Category</th>
                        <th>Lorry Type</th>
                        <th>Quantity</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.lorryCategory?.category}</td>
                          <td>{order.lorryType?.typeName}</td>
                          <td>{order.quantity}</td>
                          <td>{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}
              </div>
            )}

            {/* Requests */}
            {activeTab === "requests" && (
              <div className="tab-pane active">
                <h3>Requests</h3>
                {services.length === 0 ? (
                  <p>No Service Requests Yet.</p>
                ) : (
                  <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Service ID</th>
                        <th>Service Type</th>
                        <th>Lorry Number</th>
                        <th>Lorry Model</th>
                        <th>Preferred Date</th>
                        <th>Issue Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service._id}>
                          <td>{service._id}</td>
                          <td>{service.serviceType}</td>
                          <td>{service.lorryNumber}</td>
                          <td>{service.lorryModel}</td>
                          <td>{service.preferredDate}</td>
                          <td>{service.issueDescription}</td>
                          <td>{service.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}
              </div>
            )}

            {/* Payments */}
            {activeTab === "payments" && (
              <div className="tab-pane active">
                <h3>Payment Histories</h3>
                <p>Customer payment records will be displayed here.</p>
              </div>
            )}

            {/* Quotations */}
            {activeTab === "quotations" && (
              <div className="tab-pane active">
                <h3>Quotations</h3>
                {quotations.length === 0 ? (
                  <p>No Quotation Requests Yet.</p>
                ) : (
                  <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Quotation ID</th>
                        <th>Lorry Model</th>
                        <th>Lorry Category</th>
                        <th>Lorry Type</th>
                        <th>Quantity</th>
                        <th>Expected Delivery Date</th>
                        <th>Custom Features</th>
                        <th>Quoted Price</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotations.map((quotation) => (
                        <tr key={quotation._id}>
                          <td>{quotation._id}</td>
                          <td>{quotation.lorryModel}</td>
                          <td>{quotation.lorryCategory?.category}</td>
                          <td>{quotation.lorryType?.typeName}</td>
                          <td>{quotation.quantity}</td>
                          <td>{quotation.expectedDeliveryDate}</td>
                          <td>{quotation.customFeatures}</td>
                          <td>{quotation.quotedPrice}</td>
                          <td>{quotation.remarks}</td>
                          <td>{quotation.status}</td>
                          <td>
                            {new Date(quotation.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
