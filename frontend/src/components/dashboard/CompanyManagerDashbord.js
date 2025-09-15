import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function CompanyManagerDashbord() {
    const [notification, setNotification] = useState({
        show: false,
        type: "success", // success | error
        message: "",
      });
       // Auto-hide notification after 3s
        useEffect(() => {
          if (notification.show) {
            const timer = setTimeout(() => {
              setNotification((prev) => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
          }
        }, [notification]);
 const [requests, setRequests] = useState([]);

  // Fetch all quotation requests
  useEffect(() => {
    axios
      .get("http://localhost:5000/quotationRequest/allQuotationrequests") 
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  return (
    <>
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Quotation Requests</h1>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Request ID</th>
              <th className="border border-gray-300 p-2">Client ID</th>
              <th className="border border-gray-300 p-2">Lorry Category</th>
              <th className="border border-gray-300 p-2">lorryType</th>
              <th className="border border-gray-300 p-2">lorryModel</th>
              <th className="border border-gray-300 p-2">customFeatures</th>
              <th className="border border-gray-300 p-2">quantity</th>
              <th className="border border-gray-300 p-2">expectedDeliveryDate</th>
              <th className="border border-gray-300 p-2">status</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="border border-gray-300 p-2">{req._id}</td>
                <td className="border border-gray-300 p-2">{req.clientID}</td>
                <td className="border border-gray-300 p-2">{req.lorryCategory}</td>
                <td className="border border-gray-300 p-2">{req.lorryType}</td>
                <td className="border border-gray-300 p-2">{req.lorryModel}</td>
                <td className="border border-gray-300 p-2">{req.customFeatures}</td>
                <td className="border border-gray-300 p-2">{req.quantity}</td>
                <td className="border border-gray-300 p-2">{req.expectedDeliveryDate}</td>
                <td className="border border-gray-300 p-2">{req.status}</td>
                <td className="border border-gray-300 p-2">
                  {/* Navigate to QuotationForm with requestID */}
                  <Link
                    to={`/quotationgeneratorform/${req._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Generate Quotation
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
{/* Notification */}
      {notification.show && (
        <div
          className={`notification ${notification.type}`}
          role="alert"
          aria-live="assertive"
        >
          <div className="notification__body">
            <h2 className="notification__header">
              {notification.type === "success" ? "Success" : "Error"}
            </h2>
            <p className="notification__text">{notification.message}</p>
          </div>
          <div className="notification__action">
            <button
              className="notification_button"
              onClick={() =>
                setNotification((prev) => ({ ...prev, show: false }))
              }
            >
              ✕
            </button>
          </div>
        </div>
      )}
      </>
      
      
  );
};

export default CompanyManagerDashbord;
