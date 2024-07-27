import React, { useContext } from "react";
import "./Header.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import UserContext from "../../UserContext/UserContext";
import { Link } from 'react-router-dom';


export default function Header() {
  const { unreadCount, user } = useContext(UserContext);
  return (
    <>
      <section className="h-wrapper">

        {/* show the main menu if the user is logged in or registered */}
        {user ? (
          <div className=" innerWidth  h-container">
            <Link to="/">
            <img
              className="transition"
              src="./vehixLogo.png"
              alt=""
              width={200}
            />
            </Link>
            
            <div className=" flexCenter h-menu">
              <Link to="/" className="transition">
              Home
              </Link>
              <Link to="/documents" className="transition" >
              
                Documents
              </Link>
              <Link className="transition" to="/vehicles">
             
                Vehicles
              </Link>
            </div>
            <Link to="/notifications">
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon className=" notification-icon" />
            </Badge>
            </Link>
          </div>
        ) :

        /* otherwise show login and register buttons */
        (
          <div className=" innerWidth  h-container">
            <Link to="/">
            <img src="./vehixLogo.png" alt="" width={200} />
            </Link>
            <Link to="/" className="transition">
              Home
              </Link>
            <div className="flexCenter h-login">
              <Link to="/login">
              <button className="button2">Login</button>
              </Link>
              <Link to="/register">
              <button className="button">Get Started</button>
              </Link>
              
            </div>
          </div>
        )}
      </section>
    </>
  );
}
