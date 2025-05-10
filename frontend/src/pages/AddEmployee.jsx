import React, { useState } from "react";
import Swal from "sweetalert2";


const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    username: "",
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New User Data:", employee);
    // alert("Employee added successfully (frontend only for now)");
    try {
      const response = await fetch("http://localhost:8080/user/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      Swal.fire({
      icon: "success",
      title: "User added",
      text: "User added successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    setEmployee({ username: "", role: "", email: "", password: "" });
  }
    catch (error) {
      console.error("Error adding user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add user",
        confirmButtonColor: "#d33",
      });
    }

  };

  return (
    <div className="h-[calc(100dvh-80px)] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-5 rounded-2xl shadow-xl border-l-4 border-blue-500 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add User
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="username"
              value={employee.username}
              onChange={handleChange}
              placeholder="Enter User Name"
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              name="role"
              value={employee.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Enter User Email"
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={employee.password}
              onChange={handleChange}
              placeholder="Enter User Password"
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all shadow-md"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
