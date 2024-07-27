import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Hero from "./Components/Hero/Hero.jsx";
import Login from "./Components/Login/Login.jsx";
import Features from "./Components/Features/Features.jsx";
import Ratings from "./Components/Ratings/Ratings.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Register from "./Components/Register/Register.jsx";
import DocumentUpload from "./Components/DocumentUpload/DocumentUpload.jsx";
import VehicleDetails from "./Components/VehicleDetails/VehicleDetails.jsx";
import NotificationSystem from "./Components/NotificationSystem/NotificationSystem.jsx";
import UserContextProvider from "./UserContext/UserContextProvider.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Ratings />
    </>
  );
}
function App() {
 
  return (
    <Router>
 <UserContextProvider>
  <ScrollToTop/>
      <div className="App">
       
          <Header />
          
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documents" element={<DocumentUpload />} />
          <Route path="/vehicles" element={<VehicleDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<NotificationSystem />} />
        </Routes>
       
        <Footer />
      </div>
    </UserContextProvider>
    </Router>
   
  );
}

export default App;
