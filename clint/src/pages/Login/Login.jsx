import { useState } from "react";
import { URL } from "../../Utils/url.js";
import {
  loginSuccess,
  loginFailure,
  loginStart,
} from "../../Redux/Slices/UserSlice.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./login.scss";
import { MdOutlineClose } from "react-icons/md";

const api = axios.create({
  baseURL: URL,
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  
  if (user) {
    return navigate("/");
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginStart());
      api
        .post("/auth/login", { email, password })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          dispatch(loginSuccess(res.data.data));
          toast.success(res.data.message);
          if (res.data.message === "Login Successful ✅") {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || err.message);
          dispatch(loginFailure());
        });
    } else {
      toast.error("Please fill all the fields 📝");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <div className="view-student-header">
        <h2>Signup</h2>
        <button className="close-btn">
          <Link to="/" className="view-student-link">
            <MdOutlineClose className="close" size={24} />
          </Link>
        </button>
      </div>
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!email}
              helperText={!email && "Email is required"}
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!password}
              helperText={!password && "Password is required"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
