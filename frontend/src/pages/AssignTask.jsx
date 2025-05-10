import React, { useState, useContext, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Swal from "sweetalert2";
import { DataContext } from "../context/DataContext";

const AssignTask = () => {
  const { loggedInUser } = useContext(DataContext);

  let [employees, setEmployees] = useState([]);
  let [task, setTask] = useState({
    assignedToId: "",
    title: "",
    deadline: "",
    description: "",
  });

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/getAllEmployees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setEmployees(data);
        // console.log("Employees: ", data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    // console.log("task: ", task);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      assignedToId: task.assignedToId,
    };
    // console.log("task data: ", taskData)

    try {
      const response = await fetch("http://localhost:8080/task/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to assign task");
      }

      Swal.fire({
        icon: "success",
        title: "Task Assigned",
        text: "Task was successfully assigned.",
        showConfirmButton: false,
        timer: 1500,
      });

      setTask({
        assignedToId: "",
        title: "",
        deadline: "",
        description: "",
      });
    } catch (error) {
      console.error("Error assigning task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to assign task",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 m-5 rounded-2xl shadow-xl border-l-4 border-blue-500 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Assign Task
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Employee Selection */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-1">
              Employee Name
            </label>
            <select
              name="assignedToId"
              value={task.assignedToId}
              onChange={handleChange}
              className="w-full p-2 pr-9 border cursor-pointer hover:bg-gray-100 focus:bg-gray-100  
                         border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 appearance-none 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.username}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-10 pointer-events-none text-gray-500">
              <IoIosArrowDown />
            </span>
          </div>

          {/* Task Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Task Title
              </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition"
              required
            />
          </div>

          {/* Deadline */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm transition resize-none h-24"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg font-medium 
                       hover:bg-blue-600 transition-all shadow-md cursor-pointer"
          >
            Assign Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;