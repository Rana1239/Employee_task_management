import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { DataContext } from "../context/DataContext";
import Swal from "sweetalert2";
import axios from "axios";

const TasksEmp = ({ task, employeeName , refreshTasks}) => {
  const { loggedInUser} = useContext(DataContext); // Use context
  console.log("Task: ", task);
  console.log("Employee Name: ", employeeName);
  console.log("Logged In User: ", loggedInUser);
  const handleStatuUpdate = async (newStatus, successMessage) => {
    try {
      console.log("current token: ", loggedInUser?.token);
      const response = await axios.put(
        `http://localhost:8080/task/employee/tasks/${task.id}/status`,
        // null,
        {
          params: { status: newStatus },
          headers: {
            Authorization: `Bearer ${loggedInUser?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Task status updated:", response.data);
      Swal.fire({
        icon: "success",
        title: successMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      if(refreshTasks) refreshTasks(); // Refresh tasks after status update
    }catch (error) {
      console.error("Error updating task status:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Failed to update task status",
      });
    }
  };
  const handleStart = () => {
    Swal.fire({
      title: "Are you ready to start the task?",
      text: "This action cannot be undone!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Start it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
          handleStatuUpdate("IN_PROGRESS", "Task Marked as In Progress");
        }
      });
    };
  const handlePending = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can still continue this task later",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatuUpdate("PENDING", "Task Marked as Pending");
        // console.log("Employee deleted (Code need to implement yet)");
      }
    });
  };
  const handleCompleted = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "I completed it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#00A63E",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatuUpdate("COMPLETED", "Task Marked as Completed");
        // console.log("Employee deleted (Code need to implement yet)");
      }
    });
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500 flex flex-col gap-4 w-full h-auto">
        {employeeName && (
          <div className="flex items-center gap-2 text-gray-800 font-medium text-lg">
            <FaUser className="text-blue-500" />
            <span className="text-2xl">{employeeName}</span>
          </div>
        )}

        <h3 className="text-xl font-semibold text-gray-800 mt-0">
          {task.title}
        </h3>

        <div className="text-sm text-gray-600">
          <span className="font-semibold">Deadline:</span> {task.deadline}
        </div>
        <div
          className={`px-3 py-1 text-white rounded-lg text-sm w-max ${
            task.status === "PENDING"
              ? "bg-red-500"
              : task.status === "IN_PROGRESS"
              ? "bg-blue-500"
              : task.status === "COMPLETED"
              ? "bg-green-500"
              : "bg-blue-500"
          } font-medium`}
        >
          Status: {task.status}
        </div>
        <div className="text-gray-700 text-sm leading-relaxed">
          <span>
            <span className="font-semibold">Description:</span>{" "}
            {task.description}
          </span>
        </div>
        <div className="flex gap-3 justify-center items-center mt-4">
          {loggedInUser?.category === "employee" && task.status === "PENDING" && (
            <button
              onClick={handleStart}
              className="px-4 py-2 text-white rounded-lg text-base bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer"
            >
              Start
            </button>
          )}
          {loggedInUser?.category === "employee" &&
            task.status === "IN_PROGRESS" && (
              <>
                <button
                  onClick={handleCompleted}
                  className="px-4 py-2 text-white rounded-lg text-base bg-green-500 hover:bg-green-600 transition-all cursor-pointer"
                >
                  Complete
                </button>

                <button
                  onClick={handlePending}
                  className="px-4 py-2 text-white rounded-lg text-base bg-red-500 hover:bg-red-600 transition-all cursor-pointer"
                >
                  Pending
                </button>
              </>
          )}

        </div>
      </div>
    </>
  );
};

export default TasksEmp;

