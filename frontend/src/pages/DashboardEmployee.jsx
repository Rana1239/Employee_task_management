import React, { useContext, useEffect, useState } from "react";
import TasksOverview from "../components/TasksOverview";
import TasksDashboard from "../components/TasksDashboard";
import { DataContext } from "../context/DataContext";
import axios from "axios";

const Dashboard = () => {
  const { getLoggedInUserData } = useContext(DataContext);
  const userData = getLoggedInUserData();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("userData; ", userData);

  if (!userData) {
    return <div className="p-6 text-red-500">No user data found.</div>;
  }

  const isAdmin = userData.category?.toLowerCase() === "admin";
  console.log("Token1: ", localStorage.getItem("token"));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if(token){
        console.log("Token Data: ", JSON.parse(atob(token.split('.')[1])));
        }
        const url = isAdmin
          ? "http://localhost:8080/task/admin/tasks"
          : "http://localhost:8080/task/employee/tasks";
        
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data); // Store fetched tasks in state
        console.log("Tasks: ", response.data);
        setLoading(false); // Update loading state
      } catch (err) {
        console.log("Error fetching tasks:", err);
        setError("Error fetching tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isAdmin]);

  if (loading) {
    return <div className="p-6">Loading tasks...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="main h-full w-full">
        <div className="overview-block w-full flex flex-col ">
          <div className="text-4xl w-full max-[450px]:pl-10 p-6 pl-20 pb-0">Overview</div>
          <div className="w-full h-fit overview p-20 max-[450px]:p-10 max-[450px]:pt-4 max-[450px]:pb-4 pb-4 pt-4 flex justify-between flex-wrap gap-6">
            <TasksOverview
              color="blue"
              title="Pending Tasks"
              number={tasks.filter((task) => task.status === "PENDING").length}
            />
            <TasksOverview
              color="yellow"
              title="In Progress"
              number={tasks.filter((task) => task.status === "IN_PROGRESS").length}
            />
            <TasksOverview
              color="green"
              title="Completed Tasks"
              number={tasks.filter((task) => task.status === "COMPLETED").length}
            />
          </div>
        </div>
        <div className="Tasks-block w-full flex flex-col ">
          <div className="text-4xl w-full p-6 pl-20 max-[450px]:pl-10 pb-0 pt-2">Tasks</div>
          <div className="w-full h-fit overview p-20 max-[450px]:p-10 max-[450px]:pt-4 max-[450px]:pb-4 pb-4 pt-4 flex flex-wrap gap-6">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TasksDashboard
                  key={index}
                  task={task}
                />
              ))
            ) : (
              <p className="text-gray-500">No tasks available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;