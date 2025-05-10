import React from "react";

const colorVariants = {
  blue: "from-blue-400 to-blue-500",
  green: "from-green-400 to-green-500",
  yellow: "from-yellow-300 to-yellow-400",
  red: "from-red-400 to-red-500",
};

const TasksOverview = ({color = 'blue',title,number}) => {
  return (
    <div className="grow">
      <div className={`w-auto min-w-[254px] h-52 bg-gradient-to-br ${colorVariants[color]}  rounded-2xl p-5 flex flex-col shadow-lg`}>
        <div className="text-2xl font-semibold h-8">{title}</div>
        <div className="number h-full font-bold text-6xl flex justify-center items-center">{number}</div>
      </div>
    </div>
  );
};

export default TasksOverview;
