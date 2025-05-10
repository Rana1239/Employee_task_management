import React, { Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("etms_loggedInUser");

    if (!loggedInUser) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);
  
  return children;
};

export default ProtectedRoutes;
