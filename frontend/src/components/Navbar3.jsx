import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaUserEdit,
  FaPlus,
  FaBars,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";
import { Link, useNavigate, useLocation, } from "react-router-dom";
import { DataContext } from "../context/DataContext"; // Import context

const Navbar3 = () => {
  const { loggedInUser, setLoggedInUser } = useContext(DataContext); // Use context
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div className="z-[49] header h-20 w-full flex justify-between items-center max-[450px]:px-3 px-10 bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg text-white sticky top-0">

        <div className={`flex items-center ${isLoginPage ? "invisible" : ""}`}>
        <button
          className="sm:text-2xl text-xl cursor-pointer mr-4 focus:outline-none absolute z-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>
        <Link to="/">
          <div className="logo sm:text-2xl max-[450px]:text-lg text-xl font-bold sm:pl-10 pl-7">Taskify</div>
        </Link>
        </div>
        <div className="font-serif text-xl sm:text-xl md:text-xl lg:text-2xl">
          {loggedInUser && `Welcome, ${loggedInUser.name}` || 'Welcome'}
        </div>
        <div className="right font-light">
          {loggedInUser ? (
            <button
              onClick={() => {
                setLoggedInUser(null);
                navigate('/login');
              }}
              className="sm:text-2xl max-[450px]:text-base text-lg font-semibold cursor-pointer outline-none"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="sm:text-2xl text-lg font-semibold cursor-pointer outline-none">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar with ref */}
      {!isLoginPage && (
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-blue-700 shadow-xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform w-64 p-6 z-50`}
      >
        <button
          className="absolute cursor-pointer top-4 right-4 text-2xl text-white hover:text-red-500 focus:outline-none"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes />
        </button>
        <ul className="text-white text-lg font-medium space-y-4 mt-10">
          <li onClick={() => setIsSidebarOpen(false)}>
            <Link
              to={loggedInUser ? "/" : "#"}
              className="flex items-center space-x-3 cursor-pointer hover:bg-blue-800 p-2 pl-4 rounded-lg transition"
            >
              <FaTachometerAlt /> <span>Dashboard</span>
            </Link>
          </li>
          <li onClick={() => setIsSidebarOpen(false)}>
            <Link
              to={loggedInUser ? "/tasks" : "#"}
              className="flex items-center space-x-3 cursor-pointer hover:bg-blue-800 p-2 pl-4 rounded-lg transition"
            >
              <FaTasks /> <span>Tasks</span>
            </Link>
          </li>
          {loggedInUser?.category === 'admin' && <li onClick={() => setIsSidebarOpen(false)}>
            <Link
              to="/assign"
              className="flex items-center space-x-3 cursor-pointer hover:bg-blue-800 p-2 pl-4 rounded-lg transition"
            >
              <FaPlus /> <span>Assign Task</span>
            </Link>
          </li>}
          {loggedInUser?.category === 'admin' && <li

          onClick={() => setIsSidebarOpen(false)}>
            <Link
            to="/add"
              className="flex items-center space-x-3 cursor-pointer hover:bg-blue-800 p-2 pl-4 rounded-lg transition"
            >
              <FaUserPlus /> <span>Add Employee</span>
            </Link>
          </li>}
          {/* {loggedInUser?.category === 'admin' && <li onClick={() => setIsSidebarOpen(false)}>
            <Link
              to="/edit"
              className="flex items-center space-x-3 cursor-pointer hover:bg-blue-800 p-2 pl-4 rounded-lg transition"
            >
              <FaUserEdit /> <span>Edit Employee</span>
            </Link>
          </li>} */}
        </ul>
      </div>
      )}
    </>
  );
};

export default Navbar3;