import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext/UserContext";
import "./NotificationSystem.css"; // Make sure to create this CSS file for styling
import { format } from "date-fns";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const { files, vehicles, setUnreadCount } =
    useContext(UserContext);

  useEffect(() => {
    const currentDate = new Date();

    const documentNotifications = files
      .filter((file) => {
        const expiryDate = new Date(file.expiryDate);
        const diffDays = Math.ceil(
          (expiryDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        return (diffDays >= 0 && diffDays <=30);
      })
      .map((file) => ({
        id: `doc-${file.name}-${file.expiryDate}`,
        type: "document",
        message: `The document "${file.documentName}" of"${file.personName}" is expiring on ${format(
          new Date(file.expiryDate),
          "yyyy-MM-dd"
        )}`,
        read: false,
        date: new Date().toLocaleString(),
      }));

    const serviceNotifications = vehicles
      .filter((vehicle) => {
        const nextServiceDate = new Date(vehicle.nextServiceDate);
        const diffDays = Math.ceil(
          (nextServiceDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        return (diffDays >= 0 && diffDays <=30);
      })
      .map((vehicle) => ({
        id: `service-${vehicle.numberPlate}-${vehicle.nextServiceDate}`,
        type: "service",
        message: `The vehicle "${
          vehicle.numberPlate
        }" needs service on ${format(
          new Date(vehicle.nextServiceDate),
          "yyyy-MM-dd"
        )}`,
        read: false,
        date: new Date().toLocaleString(),
      }));

    const newNotifications = [
      ...documentNotifications,
      ...serviceNotifications,
    ];

    setNotifications((prevNotifications) => {
      // Remove any notifications that are no longer valid
      const filteredPrevNotifications = prevNotifications.filter((notif) => {
        if (notif.type === "service") {
          const vehicle = vehicles.find(
            (v) => `service-${v.numberPlate}-${v.nextServiceDate}` === notif.id
          );
          if (!vehicle) return false;
        }
        if (notif.type === "document") {
          const file = files.find(
            (f) => `doc-${f.name}-${f.expiryDate}` === notif.id
          );
          if (!file) return false;
        }
        return true;
      });

      const updatedNotifications = [...filteredPrevNotifications];
      newNotifications.forEach((newNotif) => {
        if (!updatedNotifications.some((notif) => notif.id === newNotif.id)) {
          updatedNotifications.push(newNotif);
        }
      });
      return updatedNotifications;
    });
  }, [files, vehicles]);

  useEffect(() => {
    setUnreadCount(notifications.filter((notif) => !notif.read).length);
  }, [notifications]);

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
  };

  return (
    <section className="notification-wrapper">
      <div className="paddings innerWidth notification-container">
        <header className="notification-header">
          <h1 className="primaryText">Notification System</h1>

          <button className="mark-read-button" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </button>
        </header>
        <div className="notification-content">
          <h1 className="orangeText">Your Dashboard</h1>
          {notifications.length === 0 ? (
            <div className="no-notification-image">
              <img src="./noNotification.webp" alt="" />
              <h1 className="secondaryText">No Notification</h1>
            </div>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`notification-item ${
                    notification.read ? "read" : "unread"
                  } ${notification.type}`}
                >
                  <p>{notification.message}</p>
                  <span>{notification.date}</span>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    Delete <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotificationSystem;
