import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import '../index.css';
import axios from 'axios'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { data, setLoggedInUser } = useContext(DataContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
      [e.target.id]: e.target.value.trim(),
    });
    setErrorMessage("");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");
    try{
      const response = await axios.post("http://localhost:8080/user/login",
      {
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if(response.data && response.data.token){
      localStorage.setItem('token',response.data.token);
      const role = response.data.role.toLowerCase().includes("admin") ? "admin" : "employee";
      setLoggedInUser({
        name: response.data.username,
        email: formData.email,
        category: role,
        id: response.data.id,
      });
      navigate("/");
      console.log("Login successful:", response.data);
    }
    else{
      setErrorMessage(response.data.message);
    }
  }
    catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || "Invalid email or password.");
    }
  }

  return (
    <div className="main_bar fixed inset-0">
      <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <div className="bg-white p-8 m-5 rounded-2xl shadow-xl border-l-4 border-blue-500 w-96">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                          focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition"
                required
                autoComplete="on"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                          focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2 mb-2 text-center">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg font-medium 
                        hover:bg-blue-600 transition-all shadow-md cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;