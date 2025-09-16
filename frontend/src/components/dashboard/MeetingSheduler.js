import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function MeetingScheduler() {
  

  return (
    <>
    <h1>calendar</h1>
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

export default MeetingScheduler;
