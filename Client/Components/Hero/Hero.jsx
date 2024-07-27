import React from "react";
import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      <section className="hero-wrapper">
        <div className="flexColStart innerWidth paddings hero-container">
          <div className="hero-title">
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Efficiently Manage Your
            </motion.h1>

            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Vehicle Operations
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText hero-desc">
            <span>Streamline document management, notifications,</span>
            <span>
              and vehicle maintenance with{" "}
              <span className="orangeText">Vehix</span>.
            </span>
          </div>

          <div className="innerWidth  paddings stats-container">
            <div className=" stat">
              <img src="./driver.png" alt="" />
              <span className="primaryText">
                <CountUp start={0} end={1000} duration={3} />
                <span className="orangeText">+</span>
              </span>
              <span>Driver Profiles</span>
            </div>
            <div className=" stat">
              <img src="./documentation.png" alt="" />
              <span className="primaryText">
                <CountUp start={0} end={50000} duration={4} />
                <span className="orangeText">+</span>
              </span>
              <span>Documents Scanned</span>
            </div>
            <div className="orangeCircle" />
            <div className=" stat">
              <img src="./satisfaction.png" alt="" />
              <span className="primaryText">
                <CountUp start={0} end={95} duration={3} />
                <span className="orangeText">%</span>
              </span>
              <span>User Satisfaction</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
