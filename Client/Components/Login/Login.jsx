import { React, useContext, useState } from "react";
import UserContext from "../../UserContext/UserContext";
import "./Login.css";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export default function Login() {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", { emailID, password });
      console.log(response.data);
      setUser(true);
      navigate('/');
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <>
      <section className="login-wrapper">
        <div className="login-container">
          <div className="paddings login-left">
            <img src="./vehixLogo.png" alt="" width={200} />
            <h1 className="login-heading">Welcome Back</h1>
            <div className="login-form">
              <TextField
                className="input"
                id="outlined-basic"
                label="Email ID"
                variant="outlined"
                value={emailID}
                onChange={(e) => {
                  setEmailID(e.target.value);
                }}
              />
              <TextField
                className="input"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Keep me logged in"
                />
                <a href="">Forgot Password</a>
              </div>
              <button onClick={handleLogin} className="button login-button">
                Login
              </button>
            </div>
          </div>
          <div className="login-right">
            <img src="./login.avif" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
