import React from "react";
import Navbar3 from "./components/Navbar3";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="relative">
      <Navbar3 />
      <AppRoutes />
    </div>
  );
};

export default App;
