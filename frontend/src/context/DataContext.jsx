// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import jsonData from "../data/data.json";

// export const DataContext = createContext();

// const DataProvider = ({ children }) => {
//   const [data, setData] = useState(jsonData);
//   const [loggedInUser, setLoggedInUser] = useState(() => {
//     return JSON.parse(localStorage.getItem("etms_loggedInUser")) || null;
//   });

//   // Base API configuration
//   const api = axios.create({
//     baseURL: "http://localhost:8080", // Backend URL
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${loggedInUser?.token}`,
//     },
//   });

//   const getLoggedInUserData = () => {
//     return loggedInUser;
//   };

//   const updateTaskStatus = async (taskId, status) => {
//     // console.log("current token: ", loggedInUser?.token);
//     try {
//       const response = await api.put(`/task/employee/tasks/${taskId}/status`, null, {
//         params: { status },
//         headers: {
//           Authorization: `Bearer ${loggedInUser?.token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log("Task status updated:", response.data);
      
//       // Update local data if needed
//       setData(prevData => ({
//         ...prevData,
//         tasks: prevData.tasks.map(task => 
//           task.id === taskId ? { ...task, status } : task
//         )
//       }));
      
//       return response.data;
//     } catch (error) {
//       console.error("Error updating task status:", error);
//       throw error;
//     }
//   };

//   // Sync localStorage when user logs in or out
//   useEffect(() => {
//     if (loggedInUser) {
//       localStorage.setItem("etms_loggedInUser", JSON.stringify(loggedInUser));
//       // Update axios headers with new token
//       api.defaults.headers.Authorization = `Bearer ${loggedInUser.token}`;
//     } else {
//       localStorage.removeItem("etms_loggedInUser");
//       delete api.defaults.headers.Authorization;
//     }
//   }, [loggedInUser]);

//   return (
//     <DataContext.Provider
//       value={{
//         data,
//         setData,
//         loggedInUser,
//         setLoggedInUser,
//         getLoggedInUserData,
//         updateTaskStatus, // Add the new function
//         api, // Expose axios instance if needed elsewhere
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export default DataProvider;

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jsonData from "../data/data.json";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState(jsonData);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return JSON.parse(localStorage.getItem("etms_loggedInUser")) || null;
  });

  // Create Axios instance
  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor to add token before each request
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const user = JSON.parse(localStorage.getItem("etms_loggedInUser"));
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // Sync localStorage with state
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("etms_loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("etms_loggedInUser");
    }
  }, [loggedInUser]);

  const getLoggedInUserData = () => loggedInUser;

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await api.put(`/task/employee/tasks/${taskId}/status`, null, {
        params: { status },
      });

      // Optional: update local task list
      setData((prevData) => ({
        ...prevData,
        tasks: prevData.tasks.map((task) =>
          task.id === taskId ? { ...task, status } : task
        ),
      }));

      return response.data;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loggedInUser,
        setLoggedInUser,
        getLoggedInUserData,
        updateTaskStatus,
        api,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
