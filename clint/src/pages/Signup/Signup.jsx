import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "../../Redux/Slices/SignupUserSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./signup.scss";

const Signup = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const api = axios.create({
    baseURL: URL,
  });

  if (user) {
    navigate("/");
  }

  const signup = async (e) => {
    e.preventDefault();
    setEmailError(!email);
    setPasswordError(!password || password.length < 7);

    if (role && email && password && password.length >= 7) {
      const data = {
        email,
        password,
        role,
      };

      dispatch(signupStart());

      await api
        .post("/auth/signup", data)
        .then((res) => {
          dispatch(signupSuccess(res.data));
          toast.success(res.data.message);

          if (res.data.message === "User Registration Successful") {
            navigate("/otp");
          }
        })
        .catch((err) => {
          dispatch(signupFailure());
          toast.error(err.response.data.message);
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
        <h2>Signup</h2>
        <form onSubmit={signup}>
          <div className="form-group">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              error={emailError}
              helperText={emailError ? "Email is required" : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextField
              label="Role"
              select
              SelectProps={{
                native: true,
              }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </TextField>
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              error={passwordError}
              helperText={
                passwordError
                  ? password.length < 7
                    ? "Password must be at least 7 characters"
                    : "Password is required"
                  : ""
              }
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button type="submit" className="auth-button">
            Signup
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
