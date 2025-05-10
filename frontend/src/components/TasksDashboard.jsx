import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const TasksDashboard = ({ task }) => {
  const { getLoggedInUserData } = useContext(DataContext);
  const userData = getLoggedInUserData();
  const isAdmin = userData.category === "admin";

  return (
    <>
      <div
        className={`bg-white p-4 rounded-xl shadow-lg border-l-4 
      border-blue-500 flex flex-col gap-2 grow w-80 ${isAdmin ? "h-64" : "h-58"}`}
      >
        <h3 className="text-lg font-semibold line-clamp-2">{task.title}</h3>

        {isAdmin && (
          <div className="flex items-center text-gray-600 text-sm gap-2">
            <span className="font-semibold">Assigned to:</span>
            <span>{task.assignedToName || "Unassigned"}</span>
          </div>
        )}

        <div className="flex items-center text-gray-600 text-sm gap-2">
          <span>
            <span className="font-semibold">Deadline:</span> {task.deadline || "No deadline."}
          </span>
        </div>
        <div
          className={`px-2 py-1 text-white rounded-md text-sm w-max ${
            task.status === "Failed"
              ? "bg-red-500"
              : task.status === "In Progress"
              ? "bg-yellow-500"
              : task.status === "Completed"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
        >
          <span>{task.status}</span>
        </div>
        <div className="flex text-gray-600 text-sm">
          <span className="line-clamp-2">
            <span className="font-semibold">Description: </span>
            {task.description}
          </span>
        </div>
      </div>
    </>
  );
};

export default TasksDashboard;
