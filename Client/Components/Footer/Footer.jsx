import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import { IconButton } from "@mui/material";

export default function Footer() {
  return (
    <>
      <section className="footer-wrapper">
        <div className="paddings innerWidth footer-container">
          <img src="./footer-logo.png" alt="" />
          <div className="secondaryText footer-text">
            &copy; 2024 Vehix, All rights resrved
          </div>
          <div className="footer-social">
            <i className="fa-brands fa-facebook fa-xl"></i>
            <i class="fa-brands fa-x-twitter fa-xl"></i>
            <i class="fa-brands fa-instagram fa-xl"></i>
            <i class="fa-brands fa-linkedin fa-xl"></i>
          </div>
        </div>
      </section>
    </>
  );
}
