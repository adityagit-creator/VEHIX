import { React, useContext, useState } from "react";
import "./Register.css";
import TextField from "@mui/material/TextField";
import UserContext from "../../UserContext/UserContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Register() {
  const [userName, setUserName] = useState();
  const [emailID, setEmailID] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleRegister = () => {

    if (password === confirmPassword) {
      axios.post("http://localhost:5000/api/register", { userName, emailID, password })
      .then(result => console.log(result))
      .catch(err => console.log(err));
      navigate('/');
      setUser(true);
    }
    else {
      console.error("There was an error registering!", error);
      alert("The password doesn't match..!!");
    }

  };
  return (
    <section className="register-wrapper">
      <div className="  register-container">
        <div className="register-left">
          <img src="./registerPage.jpg" alt="" />
        </div>
        <div className="register-right">
          <h1 className="primaryText">Get Started with Vehix</h1>
          <div className="registration-form">
            <TextField
              className="input"
              id="outlined-basic"
              label="User Name/Comapany Name"
              variant="outlined"
              value={userName}
              onChange={(e) => { setUserName(e.target.value) }}
            />
            <TextField
              className="input"
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
            />
            <TextField
              className="input"
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              value={emailID}
              onChange={(e) => { setEmailID(e.target.value) }}
            />
            <TextField
              className="input"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <TextField
              className="input"
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value) }}
            />

            <button onClick={handleRegister} className="button">
              Register
            </button>


          </div>
        </div>
      </div>
    </section>
  );
}
