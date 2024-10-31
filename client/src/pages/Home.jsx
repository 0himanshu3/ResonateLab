import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setUserEmail } from "../redux/userSlice"; 
import { setCredentials } from "../redux/slices/authSlice";

const Home = ({ signIn }) => {
  const [users, setUsers] = useState({ name: "", title: "", role: "", email: "", password: "" });
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/google`, "_self");
  };

  const openForgotPass = () => {
    navigate("/forgotpass");
  };

  const handleOnchange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserLogin = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  axios.defaults.withCredentials = true;

  const handleLogin = (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("Enter the details");
      return;
    }
    axios
      .post(`api/user/login`, userLogin)
      .then((result) => {
        if (result.data.success) {
          const loggedInUser = result.data.user; // Assuming 'user' data is returned on success
          dispatch(setUserEmail(loggedInUser.email));
          dispatch(setCredentials(loggedInUser)); 
          // console.log("At time of logging",loggedInUser);
          toast.success("Login successfully");
          navigate("/dashboard");
        } else {
          toast.error("Enter the correct details");
          setUserLogin({ email: "", password: "" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setUserLogin({ email: "", password: "" });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`api/user/register`, users)
      .then((result) => {
        if (result.data !== "Already Registered") {
          toast.success("Registered Successfully.");
          setUsers({ name: "", title: "", role: "", email: "", password: "" });
          // signIn();
        } else {
          toast.error(result.data);
          setUsers({ name: "", title: "", role: "", email: "", password: "" });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className={`bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 ease-in-out transform ${isSignUp ? 'scale-100' : 'scale-95'} w-full max-w-md`}>
        <h1 className="text-2xl font-bold text-center mb-6">{isSignUp ? "Create Account" : "Sign In"}</h1>
        <div className="flex justify-center mb-4">
          <button type="button" onClick={googleAuth} className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-200">
            <FcGoogle size={22} />
          </button>
        </div>
        <span className="text-center text-gray-600 mb-4">or use your email for {isSignUp ? "registration" : "login"}</span>
        {isSignUp ? (
          <form method="POST" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={users.name}
              onChange={handleOnchange}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              required
            />
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={users.title}
              onChange={handleOnchange}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              required
            />
            <input
              type="text"
              placeholder="Role"
              name="role"
              value={users.role}
              onChange={handleOnchange}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={users.email}
              onChange={handleOnchange}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={users.password}
              onChange={handleOnchange}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              required
            />
            <button className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200" type="submit">Sign Up</button>
            <p onClick={() => setIsSignUp(false)} className="text-blue-500 text-center mt-4 cursor-pointer">Already have an account? Sign In</p>
          </form>
        ) : (
          <form method="POST" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={userLogin.email}
              onChange={handleUserLogin}
              placeholder="Email"
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              required
            />
            <input
              type="password"
              name="password"
              value={userLogin.password}
              onChange={handleUserLogin}
              placeholder="Password"
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              required
            />
            <a onClick={openForgotPass} href="/forgotpass" className="text-blue-500 hover:underline mb-4">Forget your password?</a>
            <button className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200" type="submit">Sign In</button>
            <p onClick={() => setIsSignUp(true)} className="text-blue-500 text-center mt-4 cursor-pointer">Don't have an account? Sign Up</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
