import React from "react";
import Rating from "@mui/material/Rating";
import "./Ratings.css";

export default function Ratings() {
  return (
    <>
      <section className="ratings-wrapper">
        <div className="innerWidth paddings ratings-container">
          <h1 className="paddings primaryText flexCenter">
            See what our users are saying
          </h1>
          <div className="ratings">
            <div className="rating">
              <span>
                <Rating name="read-only" value={5} readOnly />
                <span className="starsText"> 5/5 Stars</span>
              </span>
              <div className=" reveiw">
                "This tool has revolutionized our document management process.
                The automated notifications are a lifesaver, ensuring we never
                miss a renewal. Highly recommend!"
              </div>
              <hr />
              <div className="author-name">-Jane D., Fleet Manager</div>
            </div>
            <div className="rating">
              <span>
                <Rating name="read-only" value={5} readOnly />
                <span className="starsText"> 5/5 Stars</span>
              </span>
              <div className=" reveiw">
                "As a driver, the system makes it easy to keep my documents
                up-to-date. The reminders are very helpful, and the interface is
                straightforward."
              </div>
              <hr />
              <div className="author-name">-John B., Driver</div>
            </div>
            <div className="rating">
              <span>
                <Rating name="read-only" value={5} readOnly />
                <span className="starsText"> 5/5 Stars</span>
              </span>
              <div className="reveiw">
                "The vehicle management system is incredibly comprehensive.
                Tracking service history and scheduling maintenance has never
                been easier."
              </div>
              <hr />
              <div className="author-name">-Carlos J., Transport Manager</div>
            </div>
            <div className="rating">
              <span>
                <Rating name="read-only" value={5} readOnly />
                <span className="starsText"> 5/5 Stars</span>
              </span>
              <div className="reveiw">
                "The notification system is a fantastic feature. Getting timely
                alerts for document renewals and vehicle services has saved us
                from potential fines and downtime."
              </div>
              <hr />
              <div className="author-name">-James T., Operations Manager</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
