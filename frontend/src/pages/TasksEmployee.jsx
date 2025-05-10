import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TasksEmp from "../components/TasksEmp";
import { DataContext } from "../context/DataContext";
import CustomDropdown from "../components/CustomDropdown";

const TasksEmployee = () => {
  const { getLoggedInUserData } = useContext(DataContext);
  const userData = getLoggedInUserData();

  const [allTasks, setAllTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [employeeNameToIdMap, setEmployeeNameToIdMap] = useState({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = userData?.category === "admin";

  // Always call useEffect, conditionally run logic inside
  useEffect(() => {
    if (!isAdmin) return;

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/getAllEmployees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const employeeData = response.data;
        setEmployees(employeeData);

        const nameToIdMap = {};
        employeeData.forEach(emp => {
          nameToIdMap[emp.username] = emp.id;
        });
        setEmployeeNameToIdMap(nameToIdMap);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Failed to fetch employees.");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [isAdmin]);

  // Fetch tasks once user data is ready (and employee mapping for admin)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = isAdmin
          ? "http://localhost:8080/task/admin/tasks"
          : "http://localhost:8080/task/employee/tasks";

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isAdmin) {
          const enhancedTasks = response.data.map(task => ({
            ...task,
            assignedToId: employeeNameToIdMap[task.assignedToName] || null,
          }));
          setAllTasks(enhancedTasks);
        } else {
          console.log("Tasks for employee: ", response.data);
          setEmployeeTasks(response.data);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    if (!userData) return;
    if (isAdmin && Object.keys(employeeNameToIdMap).length === 0) return;

    fetchTasks();
  }, [userData, isAdmin, employeeNameToIdMap]);

  if (!userData) {
    return <div className="p-6 text-red-500">No user data found.</div>;
  }

  if (loading) {
    return <div className="p-6">Loading tasks...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const employeeIdToNameMap = employees.reduce((map, emp) => {
    map[emp.id] = emp.username;
    return map;
  }, {});

  // Filter tasks
  let filteredTasks = isAdmin
    ? selectedEmployeeId
      ? allTasks.filter(task => task.assignedToId?.toString() === selectedEmployeeId.toString())
      : allTasks
    : employeeTasks;

  // Filter by status
  if (filterBy === "In Progress") {
    filteredTasks = filteredTasks.filter(task => task.status === "IN_PROGRESS");
  } else if (filterBy === "Completed") {
    filteredTasks = filteredTasks.filter(task => task.status === "COMPLETED");
  } else if (filterBy === "Pending") {
    filteredTasks = filteredTasks.filter(
      task => task.status !== "COMPLETED" && task.status !== "IN_PROGRESS"
    );
  }

  return (
    <div className="main h-full w-full">
      <div className="Tasks-block w-full flex flex-col">
        <div className="w-full p-6 pl-20 pr-20 max-[450px]:pl-10 max-[450px]:pr-10 pb-0 flex gap-3 max-[1060px]:flex-col justify-between">
          <div className="text-4xl">Tasks</div>
          <div className="flex justify-end items-center max-[736px]:flex-col flex-wrap gap-3 text-gray-800 text-lg font-medium">
            <div className="space-x-3 max-[736px]:w-full">
              <span className="max-[1060px]:hidden">Filter:</span>
              <CustomDropdown
                options={["Pending", "In Progress", "Completed"]}
                selected={filterBy}
                setSelected={setFilterBy}
                category="Filtering"
              />
            </div>

            {isAdmin && (
              <div className="flex items-center space-x-3 max-[736px]:w-full max-[736px]:flex-col max-[736px]:items-stretch max-[736px]:space-x-0 max-[736px]:space-y-2">
                <span className="whitespace-nowrap">Select Employee:</span>
                <select
                  className="p-2 border rounded max-[736px]:w-full"
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                >
                  <option value="">All Employees</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.username}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <p className="text-gray-700 min-w-40 max-[736px]:w-full max-[736px]:text-end">
              Showing {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>
        </div>

        <div className="w-full h-fit overview p-20 max-[450px]:p-10 pb-4 pt-4 flex flex-col gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TasksEmp
                key={index}
                task={task}
                employeeName={isAdmin ? employeeIdToNameMap[task.assignedToId] : null}
              />
            ))
          ) : (
            <p className="text-gray-500">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksEmployee;
