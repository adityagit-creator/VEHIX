import React from "react";
import "./Features.css";
export default function Features() {
  return (
    <>
      <section className="features-wrapper">
        <div className="innerWidth paddings features-container">
          <div className="feature">
            <img src="./documentManagement.jpg" alt="" />
            <div className="feature-desc">
              <h1 className="primaryText">Document Management</h1>
              <div className="secondaryText ">
                Streamline and automate the handling of essential driver and
                vehicle documents with our Document Management feature. Easily
                upload, categorize, and track the validity of licenses,
                insurance papers, and more
              </div>
            </div>
          </div>
          <div className="feature">
            <div className="feature-desc">
              <h1 className="primaryText">Recieve Notifications</h1>
              <div className="secondaryText">
                Stay ahead with our robust Notification System, ensuring you
                never miss an important update. Receive automated email and SMS
                alerts for upcoming document expirations and vehicle service
                reminders.
              </div>
            </div>
            <img src="./notificationSystem.jpg" alt="" />
          </div>

          <div className="feature">
            <img src="./vehicleManagement.jpg" alt="" />
            <div className="paddings feature-desc">
              <h1 className="primaryText">Vehicle Management</h1>
              <div className="secondaryText">
                Keep detailed records of each vehicle, including legal
                documents, service history, and maintenance schedules. Receive
                timely reminders for vehicle servicing and document renewals to
                ensure smooth and compliant operations. Effortlessly track and
                manage your entire fleet from a single, intuitive dashboard.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
